const express = require("express");
const router = express.Router();
const {
  addQuestionAnswer,
  getAllQuestionAnswers,
  getQuestionAnswerById,
  updateQuestionAnswer,
  deleteQuestionAnswer,
} = require("../controllers/questionAnswer.controller");

router.post("/", addQuestionAnswer);
router.get("/", getAllQuestionAnswers);
router.get("/:id", getQuestionAnswerById);
router.put("/:id", updateQuestionAnswer);
router.delete("/:id", deleteQuestionAnswer);

module.exports = router;
