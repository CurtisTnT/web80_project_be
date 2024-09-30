import validator from "validator";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import TokenModel from "../models/token.model.js";

const secretKey = process.env.TOKEN_SECRET_KEY;

const { isEmail, equals, isLength } = validator;

const userMiddleware = {
  createUserValidation: async (req, res, next) => {
    try {
      const { firstName, lastName, email, role } = req.body;

      if (!firstName) throw new Error("First name is required!");
      if (!lastName) throw new Error("Last name is required!");
      if (!email) throw new Error("Email is required!");
      if (!isEmail(email)) throw new Error("Invalid email!");
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
};

export default userMiddleware;
