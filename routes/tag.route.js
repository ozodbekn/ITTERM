const router = require("express").Router();
const {
  addTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

router.post("/", addTag);
router.get("/", getAllTags);
router.get("/:id", getTagById);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;

