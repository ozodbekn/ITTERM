const express = require("express");
const router = express.Router();
const {
  addAuthorSocial,
  getAllAuthorSocials,
  getAuthorSocialById,
  updateAuthorSocial,
  deleteAuthorSocial,
} = require("../controllers/authorSocial.controller");

router.post("/", addAuthorSocial);
router.get("/", getAllAuthorSocials);
router.get("/:id", getAuthorSocialById);
router.put("/:id", updateAuthorSocial);
router.delete("/:id", deleteAuthorSocial);

module.exports = router;
