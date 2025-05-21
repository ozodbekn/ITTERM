const { addAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor, loginAuthor, logoutAuthor, refreshAuthorToken, authorActivate } = require("../controllers/author.controller");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");
const authorSelfGuard = require("../middlewares/guards/author-self.guard");

const router = require("express").Router();

router.post("/", addAuthor);
router.get("/", authorJwtGuard,getAllAuthors
);
router.post("/login", loginAuthor);
router.post("/logout", logoutAuthor);
router.post("/refresh", refreshAuthorToken);
router.post("/activate/:link", authorActivate);
router.get("/:id",authorJwtGuard,authorSelfGuard, getAuthorById);
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
