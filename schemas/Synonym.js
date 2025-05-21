const { model, Schema, Types } = require("mongoose");

const synonymSchema = new Schema({
  desc_id: { type: Schema.Types.ObjectId, ref: "Description" },
  dict_id: { type: Schema.Types.ObjectId, ref: "Dictionary" },
});

module.exports = model("Dictionary", synonymSchema);
