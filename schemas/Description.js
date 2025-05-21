const { model, Schema, Types } = require("mongoose");

const descSchema = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: "Category" },
  description: { type: String, required: true },
});

module.exports = model("Description", descSchema);
