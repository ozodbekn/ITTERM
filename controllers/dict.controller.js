const { sendErrorResponse } = require("../helpers/send_error_response");
const Dict = require("../schemas/Dict");
const { dictValidation } = require("../validation/dict.validation");

const addDict = async (req, res) => {
  try {
    const { error, value } = dictValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const { term } = value;
    const newDict = await Dict.create({ term, letter: term[0] });
    res.status(201).send({ message: "New Term added", newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDicts = async (req, res) => {
  try {
    const newDict = await Dict.find();
    res.status(200).send({ newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDictById = async (req, res) => {
  try {
    const { id } = req.params;
    const newDict = await Dict.findById(id);
    res.status(200).send({ newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDictByLetter = async (req, res) => {
  try {
    const { letter } = req.params;
    const newDict = await Dict.find({ letter });
    res.status(200).send({ newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDict = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = dictValidation(req.body);
    if(error){
      return res.status(500).send({message:error.error})
    }

    const updatedDict = await Dict.findByIdAndUpdate(id, value, { new: true });
    if (!updatedDict)
      return res.status(404).send({ message: "Term not found" });
    res.status(200).send({ message: "Term updated", updatedDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDict = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDict = await Dict.findByIdAndDelete(id);
    if (!deletedDict)
      return res.status(404).send({ message: "Term not found" });
    res.status(200).send({ message: "Term deleted", deletedDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDict,
  getAllDicts,
  getDictById,
  getDictByLetter,
  updateDict,
  deleteDict,
};
