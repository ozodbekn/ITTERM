const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../schemas/Category");

const addCategory = async (req, res) => {
  try {
    const { name, parent_category_id } = req.body;
    const newCategory = await Category.create({ name, parent_category_id });
    res.status(201).send({ message: "New category added", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent_category_id");
    res.status(200).send({ categories });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("parent_category_id");
    if (!category) return res.status(404).send({ message: "Category not found" });
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent_category_id } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, parent_category_id },
      { new: true }
    ).populate("parent_category_id");
    if (!updatedCategory) return res.status(404).send({ message: "Category not found" });
    res.status(200).send({ message: "Category updated", updatedCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).send({ message: "Category not found" });
    res.status(200).send({ message: "Category deleted", deletedCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
