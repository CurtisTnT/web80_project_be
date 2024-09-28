import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import TokenModel from "../models/token.model.js";
import { sendOtpEmail } from "../mailers/userMailer.js";
import { generateSecureOTP } from "../utils/helpers.js";
import OtpModel from "../models/otp.model.js";

const secretKey = process.env.TOKEN_SECRET_KEY;
const salt = bcrypt.genSaltSync();

const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, email, password, role } =
        req.body;

      const existUser = await UserModel.findOne({ email });
      if (existUser) throw new Error("Email already exists!");

      const hashedPassword = bcrypt.hashSync(password, salt);

      const saveUser = await UserModel.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        role,
      });

      res.status(201).send({
        isSuccess: true,
        data: saveUser,
        message:
          "Your account has been successfully created. Please sign in using your credentials!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existUser = await UserModel.findOne({ email });
      if (!existUser) throw new Error("Invalid credentials!");

      const isPasswordCorrect = bcrypt.compareSync(
        password,
        existUser.password
      );

      if (!isPasswordCorrect) throw new Error("Invalid credentials!");

      const accessToken = await jwt.sign({ userId: existUser.id }, secretKey, {
        expiresIn: "5m",
      });

      await TokenModel.create({ accessToken, userId: existUser.id });

      res.header("authorization", `Bearer ${accessToken}`);
      res.status(201).send({
        isSuccess: true,
        data: existUser,
        message: "Sign in successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  signOut: async (req, res) => {
    try {
      const { accessToken } = req.auth;
      await TokenModel.findOneAndDelete({ accessToken });

      res.status(201).send({
        isSuccess: true,
        data: null,
        message: "Sign out successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  checkLogin: async (req, res) => {
    try {
      const { userId } = req.auth;
      const existUser = await UserModel.findById(userId);
      if (!existUser) throw new Error("User not exist!");

      res.status(201).send({
        isSuccess: true,
        data: existUser,
        message: "Check login successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const existUser = await UserModel.findOne({ email });
      if (!existUser) throw new Error("User not exist!");

      const otp = generateSecureOTP();

      await sendOtpEmail({ email, otp });

      await OtpModel.create({ otp, email });

      res.status(201).send({
        isSuccess: true,
        data: null,
        message: `OTP is sent to ${email}. Please check your email and use this OTP to reset your password!`,
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const existOtp = await OtpModel.findOneAndDelete({ otp });
      if (!existOtp || existOtp.email !== email)
        throw new Error("Invalid OTP!");

      res.status(201).send({
        isSuccess: true,
        data: null,
        message: "Verify OTP successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, curPassword, newPassword } = req.body;
      const existUser = await UserModel.findOne({ email });
      if (!existUser) throw new Error("Invalid credentials!");

      const isPasswordCorrect = bcrypt.compareSync(
        curPassword,
        existUser.password
      );
      if (!isPasswordCorrect) throw new Error("Invalid credentials!");

      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      await existUser.updateOne({ password: hashedPassword });

      res.status(201).send({
        isSuccess: true,
        data: null,
        message:
          "Reset password successfully! Please sign in with your updated credentials!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },
};

export default userController;
