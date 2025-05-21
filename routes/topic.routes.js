const router = require("express").Router();
const {
  addTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

router.post("/", addTopic);
router.get("/", getAllTopics);
router.get("/:id", getTopicById);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
