import express from "express";

const NoticeController = require("../controllers/Notice");
const Auth = require("../middlewares/auth");
const router = express.Router();

router.post("/:id", Auth.authenticate, NoticeController.create);

module.exports = router;
