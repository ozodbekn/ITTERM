const router = require("express").Router();

const dictRouter = require("./dict.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./desc.routes");
const authorRouter = require("./author.routes");
const socialRouter = require("./social.routes");
const topicRouter = require("./topic.routes.js");
const descTopicRouter = require("./descTopic.routes");
const tagRouter = require("./tag.routes");
const userRouter = require("./user.routes");
const adminRouter = require("./admin.routes");
const descQARouter = require("./descQA.routes.js");
const answerQuestionRouter = require("./questionAnswer.routes.js");
const AuthorSocialRouter = require("./authorSocial.routes.js");

router.use("/dict", dictRouter);
router.use("/category", categoryRouter);
router.use("/description", descRouter);
router.use("/author", authorRouter);
router.use("/social", socialRouter);
router.use("/topic", topicRouter);
router.use("/desc-topic", descTopicRouter);
router.use("/tag", tagRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/desc-qa", descQARouter);
router.use("/question-answer", answerQuestionRouter);
router.use("/author-social", AuthorSocialRouter);

module.exports = router;
