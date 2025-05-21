const { sendErrorResponse } = require("../helpers/send_error_response");
const Social = require("../schemas/Social");

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    const newSocial = await Social.create({ social_name, social_icon_file });
    res.status(201).send({ message: "New social added", newSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).send({ socials });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await Social.findById(id);
    if (!social) return res.status(404).send({ message: "Social not found" });
    res.status(200).send({ social });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSocial = await Social.findByIdAndUpdate(id, value, {
      new: true,
    });
    if (!updatedSocial)
      return res.status(404).send({ message: "Social not found" });
    res.status(200).send({ message: "Social updated", updatedSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSocial = await Social.findByIdAndDelete(id);
    if (!deletedSocial)
      return res.status(404).send({ message: "Social not found" });
    res.status(200).send({ message: "Social deleted", deletedSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addSocial,
  getAllSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
};
