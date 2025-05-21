const { sendErrorResponse } = require("../helpers/send_error_response");
const QuestionAnswer = require("../schemas/question.answer");
const {
  questionAnswerValidation,
} = require("../validation/questionAnswer.validation");

const addQuestionAnswer = async (req, res) => {
  try {
    const { error } = questionAnswerValidation(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { question, answer, topic_id, author_id } = req.body;
    const newQA = await QuestionAnswer.create({
      question,
      answer,
      topic_id,
      author_id,
    });
    res.status(201).send({ message: "New question-answer added", newQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllQuestionAnswers = async (req, res) => {
  try {
    const allQA = await QuestionAnswer.find()
      .populate("topic_id")
      .populate("author_id");
    res.status(200).send({ allQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getQuestionAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const qa = await QuestionAnswer.findById(id)
      .populate("topic_id")
      .populate("author_id");
    if (!qa)
      return res.status(404).send({ message: "Question-Answer not found" });
    res.status(200).send({ qa });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateQuestionAnswer = async (req, res) => {
  try {
    const { error } = questionAnswerValidation(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { id } = req.params;
    const { question, answer, topic_id, author_id } = req.body;
    const updatedQA = await QuestionAnswer.findByIdAndUpdate(
      id,
      { question, answer, topic_id, author_id },
      { new: true }
    )
      .populate("topic_id")
      .populate("author_id");

    if (!updatedQA)
      return res.status(404).send({ message: "Question-Answer not found" });
    res.status(200).send({ message: "Question-Answer updated", updatedQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteQuestionAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQA = await QuestionAnswer.findByIdAndDelete(id);
    if (!deletedQA)
      return res.status(404).send({ message: "Question-Answer not found" });
    res.status(200).send({ message: "Question-Answer deleted", deletedQA });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addQuestionAnswer,
  getAllQuestionAnswers,
  getQuestionAnswerById,
  updateQuestionAnswer,
  deleteQuestionAnswer,
};
