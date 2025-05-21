const { sendErrorResponse } = require("../helpers/send_error_response");
const DescTopic = require("../schemas/DescTopic");

const addDescTopic = async (req, res) => {
  try {
    const newDescTopic = await DescTopic.create(req.body);
    res.status(201).send({ message: "New desc-topic added", newDescTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDescTopics = async (req, res) => {
  try {
    const descTopics = await DescTopic.find()
      .populate("desc_id")
      .populate("topic_id");
    res.status(200).send({ descTopics });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDescTopicById = async (req, res) => {
  try {
    const descTopic = await DescTopic.findById(req.params.id)
      .populate("desc_id")
      .populate("topic_id");
    if (!descTopic)
      return res.status(404).send({ message: "DescTopic not found" });
    res.status(200).send({ descTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDescTopic = async (req, res) => {
  try {
    const updatedDescTopic = await DescTopic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("desc_id")
      .populate("topic_id");
    if (!updatedDescTopic)
      return res.status(404).send({ message: "DescTopic not found" });
    res.status(200).send({ message: "DescTopic updated", updatedDescTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDescTopic = async (req, res) => {
  try {
    const deletedDescTopic = await DescTopic.findByIdAndDelete(req.params.id);
    if (!deletedDescTopic)
      return res.status(404).send({ message: "DescTopic not found" });
    res.status(200).send({ message: "DescTopic deleted", deletedDescTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDescTopic,
  getAllDescTopics,
  getDescTopicById,
  updateDescTopic,
  deleteDescTopic,
};
