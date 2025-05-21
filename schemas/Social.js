const { model, Schema } = require("mongoose");

const socialSchema = new Schema({
  social_name: { type: String, required: true, trim: true },
  social_icon_file: { type: String },
});

module.exports = model("Social", socialSchema);
