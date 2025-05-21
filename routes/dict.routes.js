const router = require("express").Router();
const {
  addDict,
  getAllDicts,
  getDictById,
  getDictByLetter,
  updateDict,
  deleteDict,
} = require("../controllers/dict.controller");
const authorExpertGuard = require("../middlewares/guards/author-expert.guard");

router.post("/", authorExpertGuard, addDict);
router.get("/", getAllDicts);
router.get("/:id", getDictById);
router.get("/:letter", getDictByLetter);
router.put("/dicts/:id", updateDict);
router.delete("/dicts/:id", deleteDict);

module.exports = router;
