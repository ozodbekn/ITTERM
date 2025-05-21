const { model, Schema } = require("mongoose");

const dictSchema = new Schema({
  term: { type: String, required: true, trim: true },
  letter: { type: String, uppercase: true },
});

module.exports = model("Dictionary", dictSchema);
