const { Schema, model } = require("mongoose");

const authorSocialSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    social_name: {
      type: String,
      required: true,
      trim: true,
    },
    social_url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("AuthorSocial", authorSocialSchema);
