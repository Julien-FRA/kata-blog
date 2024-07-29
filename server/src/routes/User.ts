import express from "express";

const UserController = require("../controllers/User");
const Auth = require("../middlewares/auth");
const router = express.Router();

router.get("/all", UserController.findAll);
router.get("/profil", Auth.authenticate, UserController.findOne);
router.patch("/update", Auth.authenticate, UserController.update);
router.delete("/delete", Auth.authenticate, UserController.destroy);

module.exports = router;
