import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authController from "../controllers/auth.controller.js";

const AuthRoute = Router();

AuthRoute.post(
  "/sign-up",
  authMiddleware.signUpValidation,
  authController.signUp
);

AuthRoute.post(
  "/sign-in",
  authMiddleware.signInValidation,
  authController.signIn
);

AuthRoute.post(
  "/sign-out",
  authMiddleware.authValidation,
  authController.signOut
);

AuthRoute.post(
  "/check-auth",
  authMiddleware.authValidation,
  authController.checkLogin
);

AuthRoute.post(
  "/forgot-password",
  authMiddleware.forgotPasswordValidation,
  authController.forgotPassword
);

AuthRoute.post(
  "/verify-otp",
  authMiddleware.verifyOtpValidation,
  authController.verifyOtp
);

AuthRoute.post(
  "/reset-password",
  authMiddleware.resetPasswordValidation,
  authController.resetPassword
);

export default AuthRoute;
