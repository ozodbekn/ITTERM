const AuthorSocial = require("../schemas/AuthorSocial");
const {
  authorSocialValidation,
} = require("../validation/authorSocial.validation");

const addAuthorSocial = async (req, res) => {
  try {
    const { error } = authorSocialValidation(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { author_id, social_name, social_url } = req.body;
    const newSocial = await AuthorSocial.create({
      author_id,
      social_name,
      social_url,
    });
    res.status(201).send({ message: "New author social added", newSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllAuthorSocials = async (req, res) => {
  try {
    const allSocials = await AuthorSocial.find().populate("author_id");
    res.status(200).send({ allSocials });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAuthorSocialById = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await AuthorSocial.findById(id).populate("author_id");
    if (!social)
      return res.status(404).send({ message: "Author social not found" });
    res.status(200).send({ social });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAuthorSocial = async (req, res) => {
  try {
    const { error } = authorSocialValidation(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { id } = req.params;
    const { author_id, social_name, social_url } = req.body;
    const updatedSocial = await AuthorSocial.findByIdAndUpdate(
      id,
      { author_id, social_name, social_url },
      { new: true }
    ).populate("author_id");

    if (!updatedSocial)
      return res.status(404).send({ message: "Author social not found" });
    res.status(200).send({ message: "Author social updated", updatedSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteAuthorSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSocial = await AuthorSocial.findByIdAndDelete(id);
    if (!deletedSocial)
      return res.status(404).send({ message: "Author social not found" });
    res.status(200).send({ message: "Author social deleted", deletedSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addAuthorSocial,
  getAllAuthorSocials,
  getAuthorSocialById,
  updateAuthorSocial,
  deleteAuthorSocial,
};
