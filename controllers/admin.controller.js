const jwt = require("jsonwebtoken");
const Admin = require("../schemas/Admin");
const { sendErrorResponse } = require("../helpers/send_error_response");
const bcrypt = require("bcrypt");
const { adminValidation } = require("../validation/admin.validation");
const config = require("config");

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.admin_password, 7);

    const newAdmin = await Admin.create({
      admin_name: value.admin_name,
      admin_email: value.admin_email,
      admin_phone: value.admin_phone,
      admin_is_active: value.admin_is_active ?? true,
      admin_is_creator: value.admin_is_creator ?? false,
      admin_password: hashedPassword,
    });

    res.status(201).send({ message: "New Admin added", newAdmin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, admin_password } = req.body;
    const admin = await Admin.findOne({ admin_email });

    if (!admin) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.admin_email,
        is_creator: admin.admin_is_creator,
      },
      config.get("accessKeyAdmin"), // config.json dan access key
      { expiresIn: config.get("accessTimeAdmin") } // config.json dan muddati
    );

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      token,
      admin: {
        id: admin._id,
        name: admin.admin_name,
        email: admin.admin_email,
        phone: admin.admin_phone,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send({ admins });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ message: "Admin not found" });
    res.status(200).send({ admin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!admin) return res.status(404).send({ message: "Admin not found" });
    res.status(200).send({ message: "Admin updated", admin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).send({ message: "Admin not found" });
    res.status(200).send({ message: "Admin deleted", admin });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
