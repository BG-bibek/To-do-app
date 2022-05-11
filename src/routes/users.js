import middleware from "../middleware";
import userController from "../controllers/userController";
const { allAccess,  userBoard, adminBoard, moderatorBoard } = userController
const { verifyToken, isAdmin, isModerator} = middleware

const express = require('express')
const router = express.Router()

  router.get("/test/all", allAccess);

  router.get( "/test/user",[verifyToken],userBoard);

  router.get("/test/mod",[verifyToken, isModerator],moderatorBoard);

  router.get("/test/admin",[verifyToken, isAdmin],adminBoard);

  export default router;
