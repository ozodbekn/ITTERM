const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  userActivate,
  logoutUser,
  refreshUser,
} = require("../controllers/user.controller");

router.post("/", addUser);
router.get("/activate/:link", userActivate);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
