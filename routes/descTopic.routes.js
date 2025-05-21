const router = require("express").Router();
const {
  addDescTopic,
  getAllDescTopics,
  getDescTopicById,
  updateDescTopic,
  deleteDescTopic,
} = require("../controllers/descTopic.controller");

router.post("/", addDescTopic);
router.get("/", getAllDescTopics);
router.get("/:id", getDescTopicById);
router.put("/:id", updateDescTopic);
router.delete("/:id", deleteDescTopic);

module.exports = router;
