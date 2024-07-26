import express from "express";

const ArticleController = require("../controllers/Article");
const router = express.Router();

router.get("/", ArticleController.findAll);
router.get("/:id", ArticleController.findOne);
router.post("/", ArticleController.create);
router.patch("/:id", ArticleController.update);
router.delete("/:id", ArticleController.destroy);

module.exports = router;
