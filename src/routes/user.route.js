import { Router } from "express";

import userMiddleware from "../middlewares/user.middleware.js";
import userController from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post(
  "/new",
  userMiddleware.authValidation,
  userMiddleware.createUserValidation,
  userController.createUser
);

export default UserRouter;
