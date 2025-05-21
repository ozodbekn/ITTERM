const { Schema, model } = require("mongoose");

const questionAnswerSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("QuestionAnswer", questionAnswerSchema);
