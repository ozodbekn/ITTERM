const { model, Schema } = require("mongoose");

const authorSchema = new Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    nick_name: { type: String, trim: true }, //unique
    email: { type: String, trim: true, required: true }, //unique
    phone: { type: String, trim: true }, //unique
    password: { type: String },
    info: { type: String },
    position: { type: String },
    photo: { type: String },
    is_export: { type: Boolean },
    is_active: { type: Boolean },
    refresh_token: { type: String },
    activation_link: { type: String },
  },

  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Author", authorSchema);
