import middleware from "../middleware";
import controller from "../controllers/authController";
import express from 'express';
import userValidator from "../validator/userValidator" 

let router = express.Router();
const { checkDuplicateUsernameOrEmail,checkRolesExisted} = middleware

  router.post("/signup",[checkDuplicateUsernameOrEmail,checkRolesExisted],controller.signup);
  router.get('/signup', controller.emailVerification);
  router.post("/signin", controller.signin);
  router.post('/otp/:username', controller.otp);
  router.post('/token', controller.token);
  router.delete('/logout', controller.logout);

export default router;
