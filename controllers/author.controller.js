const Joi = require("joi");
const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtService = require("../service/jwt.service");
const uuid = require("uuid");
const mailService = require("../service/mail.service");

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();
    const newAuthor = await Author.create({
      ...value,
      password: hashedPassword,
      activation_link,
    });

    const link = `${config.get(
      "api_url"
    )}/api/author/activate/${activation_link}`;
    await mailService.sendMail(value.email, link);

    res.status(201).send({ message: "New Author added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).send({ authors });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) return res.status(404).send({ message: "Author not found" });
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = authorValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!updatedAuthor)
      return res.status(404).send({ message: "Author not found" });

    res.status(200).send({ message: "Author updated", updatedAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Author.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send({ message: "Author not found" });

    res.status(200).send({ message: "Author deleted", deleted });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_experts: author.is_export,
    };
    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = jwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const author = await Author.findOneAndUpdate(
      { refresh_token: "" },
      { new: true }
    );
    if (!author) {
      return res.status(400).send({ message: "token notugri" });
    }
    res.clearCookie("refreshToken");
    res.send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refreshAuthorToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    await jwtService.verifyRefreshToken(refreshToken);

    const author = await Author.findOne({ refresh_token: refreshToken });
    if (!author) {
      return res
        .status(401)
        .send({ message: "Bazada refresh token topilmadi" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_experts: author.is_export,
    };

    const tokens = jwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const authorActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const author = await Author.findOne({ activation_link: link });

    if (!author) {
      return res.status(400).send({ message: "Author link noto'g'ri" });
    }
    if (author.is_active) {
      return res
        .status(400)
        .send({ message: "Author allaqachon faollashtirilgan" });
    }
    author.is_active = true;
    await author.save();
    res.send({ message: "Author faollashtirldi", isActive: author.is_active });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
module.exports = {
  addAuthor,
  loginAuthor,
  logoutAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
  getAllAuthors,
  authorActivate,
  refreshAuthorToken,
};
