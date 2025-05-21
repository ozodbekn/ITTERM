const { sendErrorResponse } = require("../helpers/send_error_response");
const Description = require("../schemas/Description");

const addDescription = async (req, res) => {
  try {
    const { category_id, description } = req.body;
    const newDesc = await Description.create({ category_id, description });
    res.status(201).send({ message: "New description added", newDesc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.find().populate("category_id");
    res.status(200).send({ descriptions });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const description = await Description.findById(id).populate("category_id");
    if (!description)
      return res.status(404).send({ message: "Description not found" });
    res.status(200).send({ description });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = dictValidation(req.body);
    if (error) {
      return res.status(500).send({ message: error.error });
    }
    const updatedDesc = await Description.findByIdAndUpdate(id, value, {
      new: true,
    }).populate("category_id");
    if (!updatedDesc)
      return res.status(404).send({ message: "Description not found" });
    res.status(200).send({ message: "Description updated", updatedDesc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDesc = await Description.findByIdAndDelete(id);
    if (!deletedDesc)
      return res.status(404).send({ message: "Description not found" });
    res.status(200).send({ message: "Description deleted", deletedDesc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDescription,
  getAllDescriptions,
  getDescriptionById,
  updateDescription,
  deleteDescription,
};
