const { addDescription, getAllDescriptions, getDescriptionById, updateDescription, deleteDescription } = require("../controllers/description.controller");

const router = require("express").Router();
module.exports = router;

router.post("/descriptions", addDescription);
router.get("/descriptions", getAllDescriptions);
router.get("/descriptions/:id", getDescriptionById);
router.put("/descriptions/:id", updateDescription);
router.delete("/descriptions/:id", deleteDescription);
