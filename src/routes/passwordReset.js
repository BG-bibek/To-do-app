import express from "express";
import controller from "../controllers/passwordResetController";
import middleware from "../middleware";
const router = express.Router();
const {verifyToken} = middleware;

router.post("/",[verifyToken], controller.PasswordReset );
router.post("/:userId/:token", controller.resetPwd );

module.exports = router;