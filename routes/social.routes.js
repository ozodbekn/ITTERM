const {
  addSocial,
  getAllSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const router = require("express").Router();
router.post("/", addSocial);
router.get("/", getAllSocials);
router.get("/:id", getSocialById);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
