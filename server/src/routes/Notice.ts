import express from "express";

const NoticeController = require("../controllers/Notice");
const Auth = require("../middlewares/auth");
const router = express.Router();

router.get("/:articleId", NoticeController.findAll);
router.get("/:articleId/:noticeId", NoticeController.findOne);
router.post("/:articleId", Auth.authenticate, NoticeController.create);
router.patch("/:noticeId", Auth.authenticate, NoticeController.update);
router.delete("/:noticeId", Auth.authenticate, NoticeController.destroy);

module.exports = router;
