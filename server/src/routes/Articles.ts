import express from "express";

const ArticleController = require("../controllers/Article");
const Auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", ArticleController.findAll);
// router.get("/:id", ArticleController.findOne);
router.get("/user", Auth.authenticate, ArticleController.findUserArticle);
router.post("/", Auth.authenticate, ArticleController.create);
router.patch("/:id", Auth.authenticate, ArticleController.update);
router.delete("/:id", Auth.authenticate, ArticleController.destroy);

module.exports = router;
