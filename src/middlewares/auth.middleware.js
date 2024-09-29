import validator from "validator";
import jwt from "jsonwebtoken";

import TokenModel from "../models/token.model.js";

const secretKey = process.env.TOKEN_SECRET_KEY;

const { isEmail, equals, isLength } = validator;

const authMiddleware = {
  signUpValidation: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, role } =
        req.body;

      if (!firstName) throw new Error("First name is required!");
      if (!lastName) throw new Error("Last name is required!");
      if (!email) throw new Error("Email is required!");
      if (!isEmail(email)) throw new Error("Invalid email!");
      if (!password) throw new Error("Password is required!");
      if (!isLength(password, { min: 8 }))
        throw new Error("Must use a minimum of 8 alpha-numeric characters!");
      if (!confirmPassword) throw new Error("Confirm password is required!");
      if (!equals(confirmPassword, password))
        throw new Error("Confirm password and password don't match!");
      if (!role) throw new Error("Role is required!");

      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },

  signInValidation: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) throw new Error("Email is required!");
      if (!isEmail(email)) throw new Error("Invalid email!");
      if (!password) throw new Error("Password is required!");
      if (!isLength(password, { min: 8 }))
        throw new Error("Must use a minimum of 8 alpha-numeric characters!");

      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },

  authValidation: async (req, res, next) => {
    const { authorization } = req.headers;

    const accessToken = authorization?.split(" ")[1] || "";

    try {
      if (!accessToken) throw new Error("Authorization errors!");
      const existToken = await TokenModel.findOne({ accessToken });
      if (!existToken) throw new Error("Authorization errors!");

      const payload = await jwt.verify(accessToken, secretKey);

      req.auth = { userId: payload.userId, accessToken };
      return next();
    } catch (error) {
      if (error.message === "jwt expired") {
        await TokenModel.findOneAndDelete({ accessToken });
      }

      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },

  forgotPasswordValidation: async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) throw new Error("Email is required!");
      if (!isEmail(email)) throw new Error("Invalid email!");

      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },

  verifyOtpValidation: async (req, res, next) => {
    try {
      const { email, otp } = req.body;

      if (!email) throw new Error("Email is required!");
      if (!isEmail(email)) throw new Error("Invalid email!");
      if (!otp) throw new Error("OTP is required!");

      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },

  resetPasswordValidation: async (req, res, next) => {
    try {
      const { email, curPassword, newPassword, confirmPassword } = req.body;

      if (!email) throw new Error("Email is required!");
      if (!isEmail(email)) throw new Error("Invalid email!");
      if (!curPassword) throw new Error("Current password is required!");
      if (!newPassword) throw new Error("New password is required!");
      if (!isLength(newPassword, { min: 8 }))
        throw new Error("Must use a minimum of 8 alpha-numeric characters!");
      if (!confirmPassword) throw new Error("Confirm password is required!");
      if (!equals(confirmPassword, newPassword))
        throw new Error("Confirm password and password don't match!");

      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        isSuccess: false,
      });
    }
  },
};

export default authMiddleware;
