const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_info: {
      type: String,
      default: "",
    },
    user_photo: {
      type: String,
      default: "",
    },
    user_is_active: {
      type: Boolean,
      default: true,
    },
    refresh_token: { type: String },
    activation_link: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
