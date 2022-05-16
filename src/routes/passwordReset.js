import express from "express";
import controller from "../controllers/passwordResetController";
const router = express.Router();

router.post("/", controller.PasswordReset );
router.post("/:userId/:token", controller.resetPwd );

module.exports = router;