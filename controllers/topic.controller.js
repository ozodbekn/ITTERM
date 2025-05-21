const { sendErrorResponse } = require("../helpers/send_error_response");
const Topic = require("../schemas/Topic");

const addTopic = async (req, res) => {
  try {
    const newTopic = await Topic.create(req.body);
    res.status(201).send({ message: "New topic added", newTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("author_id")
      .populate("expert_id");
    res.status(200).send({ topics });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate("author_id")
      .populate("expert_id");
    if (!topic) return res.status(404).send({ message: "Topic not found" });
    res.status(200).send({ topic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateTopic = async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("author_id")
      .populate("expert_id");
    if (!updatedTopic)
      return res.status(404).send({ message: "Topic not found" });
    res.status(200).send({ message: "Topic updated", updatedTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
    if (!deletedTopic)
      return res.status(404).send({ message: "Topic not found" });
    res.status(200).send({ message: "Topic deleted", deletedTopic });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
};
