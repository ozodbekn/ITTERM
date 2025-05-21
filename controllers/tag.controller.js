const { sendErrorResponse } = require("../helpers/send_error_response");
const Tag = require("../schemas/Tag");

const addTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).send({ message: "New tag added", newTag });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().populate("topic_id").populate("category_id");
    res.status(200).send({ tags });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id)
      .populate("topic_id")
      .populate("category_id");
    if (!tag) return res.status(404).send({ message: "Tag not found" });
    res.status(200).send({ tag });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateTag = async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("topic_id")
      .populate("category_id");
    if (!updatedTag) return res.status(404).send({ message: "Tag not found" });
    res.status(200).send({ message: "Tag updated", updatedTag });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).send({ message: "Tag not found" });
    res.status(200).send({ message: "Tag deleted", deletedTag });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
