const router = require("express").Router();
const {
  addAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");


router.post("/login", loginAdmin);
// router.post("/logout", logut);
router.post("/", addAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
