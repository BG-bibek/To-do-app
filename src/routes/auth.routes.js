import middleware from "../middleware";
import controller from "../controllers/authController";
import express from 'express';
import userValidator from "../validator/userValidator" 

let router = express.Router();
const { checkDuplicateUsernameOrEmail,checkRolesExisted} = middleware

  router.post("/signup",[checkDuplicateUsernameOrEmail,checkRolesExisted],controller.signup);
  router.post("/signin", controller.signin);

export default router;
