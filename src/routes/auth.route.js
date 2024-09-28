import { Router } from "express";

import userMiddleware from "../middlewares/user.middleware.js";
import userController from "../controllers/user.controller.js";

const AuthRoute = Router();

AuthRoute.post(
  "/sign-up",
  userMiddleware.createUserValidation,
  userController.createUser
);

AuthRoute.post(
  "/sign-in",
  userMiddleware.signInValidation,
  userController.signIn
);

AuthRoute.post(
  "/sign-out",
  userMiddleware.authValidation,
  userController.signOut
);

AuthRoute.post(
  "/check-auth",
  userMiddleware.authValidation,
  userController.checkLogin
);

AuthRoute.post(
  "/forgot-password",
  userMiddleware.forgotPasswordValidation,
  userController.forgotPassword
);

AuthRoute.post(
  "/verify-otp",
  userMiddleware.verifyOtpValidation,
  userController.verifyOtp
);

AuthRoute.post(
  "/reset-password",
  userMiddleware.resetPasswordValidation,
  userController.resetPassword
);

export default AuthRoute;
