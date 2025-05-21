const User = require("../schemas/User");
const { sendErrorResponse } = require("../helpers/send_error_response");
const bcrypt = require("bcrypt");
const jwtService = require("../service/jwt.service");
const { userValidation } = require("../validation/user.validation");
const { v4: uuidv4 } = require("uuid");
const config = require("config");
const mailService = require("../service/mail.service");

const addUser = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }

    const user = await User.findOne({ user_email: value.user_email });
    if (user) {
      return res
        .status(400)
        .send({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    const hashedPassword = await bcrypt.hash(value.user_password, 7);
    const activation_link = uuidv4();

    const newUser = await User.create({
      ...value,
      user_password: hashedPassword,
      activation_link,
      user_is_active: false,
    });

    // Faollashtirish linkini yuborish
    const link = `${config.get(
      "api_url"
    )}/api/user/activate/${activation_link}`;
    await mailService.sendMail(value.user_email, link);

    res.status(201).send({
      message:
        "Ro'yxatdan o'tdingiz. Emailingizga faollashtirish linki yuborildi.",
      newUser,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const userActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const author = await User.findOne({ activation_link: link });

    if (!author) {
      return res.status(400).send({ message: "User link noto'g'ri" });
    }
    if (author.is_active) {
      return res
        .status(400)
        .send({ message: "User allaqachon faollashtirilgan" });
    }
    author.is_active = true;
    await author.save();
    res.send({ message: "User faollashtirldi", isActive: author.is_active });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.findOne({ user_email });

    if (!user) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    if (!user.user_is_active) {
      return res.status(403).send({
        message: "Akkauntingiz faollashtirilmagan. Emailingizni tekshiring.",
      });
    }

    const validPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: user._id,
      email: user.user_email,
      role: "user",
    };

    const tokenKeys = {
      accessKey: config.get("accessKeyUser"),
      refreshKey: config.get("refreshKeyUser"),
      accessTime: config.get("accessTimeUser"),
      refreshTime: config.get("refreshTimeUser"),
    };

    const tokens = new jwtService(tokenKeys).generateTokens(payload);
    await new jwtService(tokenKeys).saveToken(user._id, tokens.refreshToken);

    res
      .cookie("refreshToken", tokens.refreshToken, {
        maxAge: config.get("cookie_refresh_time"),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .send({
        message: "Tizimga xush kelibsiz",
        id: user._id,
        accessToken: tokens.accessToken,
      });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    await new jwtService().removeToken(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).send({ message: "Tizimdan chiqdingiz" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refreshUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).send({ message: "Refresh token mavjud emas" });
    }

    const tokenKeys = {
      accessKey: config.get("accessKeyUser"),
      refreshKey: config.get("refreshKeyUser"),
      accessTime: config.get("accessTimeUser"),
      refreshTime: config.get("refreshTimeUser"),
    };

    const jwt = new jwtService(tokenKeys);
    const userData = jwt.validateRefreshToken(refreshToken);
    const tokenFromDb = await jwt.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      return res
        .status(401)
        .send({ message: "Refresh token noto'g'ri yoki muddati o'tgan" });
    }

    const payload = {
      id: userData.id,
      email: userData.email,
      role: "user",
    };

    const tokens = jwt.generateTokens(payload);
    await jwt.saveToken(userData.id, tokens.refreshToken);

    res
      .cookie("refreshToken", tokens.refreshToken, {
        maxAge: config.get("cookie_refresh_time"),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .send({
        accessToken: tokens.accessToken,
        message: "Token yangilandi",
      });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User updated", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User deleted", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  userActivate,
  loginUser,
  logoutUser,
  refreshUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
