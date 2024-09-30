import { Router } from "express";

import userMiddleware from "../middlewares/user.middleware.js";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createSuperAdmin } from "../database/seed.js";

const UserRouter = Router();

createSuperAdmin()

UserRouter.get("", authMiddleware.authValidation, userController.getUsers);

UserRouter.post(
  "/new",
  authMiddleware.authValidation,
  userMiddleware.createUserValidation,
  userController.createUser
);

UserRouter.get(
  "/:id",
  authMiddleware.authValidation,
  userController.getDetailUser
);

UserRouter.post(
  "/:id",
  authMiddleware.authValidation,
  userController.updateUser
);

UserRouter.delete(
  "/:id",
  authMiddleware.authValidation,
  userController.deleteUser
);

export default UserRouter;
