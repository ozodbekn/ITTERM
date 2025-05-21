const Author = require("../schemas/Author");
const { createViewPage } = require("../helpers/create_view_page");
const Topic = require("../schemas/Topic");
const Dictionary = require("../schemas/Dict");
const { logger } = require("express-winston");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/authors", async (req, res) => {
  const authors = await Author.find().lean();
  res.render(createViewPage("authors"), {
    title: "Mualliflar",
    isAuthor: true,
    authors,
  });
});

router.get("/dictionary", async (req, res) => {
  const dicts = await Dictionary.find().lean();
  res.render(createViewPage("dictionary"), {
    title: "Lugatlar",
    isDict: true,
    dicts,
  });
});
router.get("/topics", async (req, res) => {
  const topics = await Topic.find().lean();
  console.log(topics);
  res.render(createViewPage("topics"), {
    title: "Topics",
    isTopic: true,
    topics,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Tizimga kirish",
    isLogin: true,
  });
});

module.exports = router;
