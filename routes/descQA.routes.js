const router = require("express").Router();
const controller = require("../controllers/descQA.controller");

router.post("/", controller.createDescQA);
router.get("/", controller.getAllDescQAs);
router.get("/:id", controller.getDescQAById);
router.put("/:id", controller.updateDescQA);
router.delete("/:id", controller.deleteDescQA);

module.exports = router;
