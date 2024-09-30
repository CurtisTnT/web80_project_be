import bcrypt from "bcrypt";

import UserModel from "../models/user.model.js";

const salt = bcrypt.genSaltSync();

const userController = {
  getUsers: async (req, res) => {
    try {
      const existUsers = await UserModel.find({
        role: { $in: ["lead", "staff"] },
      });

      res.status(201).send({
        isSuccess: true,
        data: existUsers,
        message: "Get users successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        role,
        designationLevel,
        jobTitle,
      } = req.body;
      const userId = req.auth.userId;

      const existUser = await UserModel.findOne({ email });
      if (existUser) throw new Error("User already exists!");

      const defaultPassword = "12345678";

      const hashedPassword = bcrypt.hashSync(defaultPassword, salt);

      const saveUser = await UserModel.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        role,
        designationLevel,
        jobTitle,
        createdById: userId,
      });

      res.status(201).send({
        isSuccess: true,
        data: saveUser,
        message: "Create a new user successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  getDetailUser: async (req, res) => {
    try {
      const { id } = req.params;

      const existUser = await UserModel.findById(id).populate("createdBy");
      if (!existUser) throw new Error("User not exist!");

      res.status(201).send({
        isSuccess: true,
        data: existUser,
        message: "Get detail user successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        phoneNumber,
        avatar,
        designationLevel,
        jobTitle,
        role,
      } = req.body;

      const existUser = await UserModel.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          avatar,
          phoneNumber,
          designationLevel,
          jobTitle,
          role,
        },
        {
          new: true,
        }
      ).populate("createdBy");
      if (!existUser) throw new Error("User not exist!");

      res.status(201).send({
        isSuccess: true,
        data: existUser,
        message: "Update user successfully!",
      });
    } catch (error) {
      res.status(500).send({
        isSuccess: false,
        data: null,
        message: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const existUser = await UserModel.findByIdAndDelete(id);
      if (!existUser) throw new Error("User not exist!");

      res.status(201).send({
        isSuccess: true,
        data: existUser,
        message: "Delete user successfully!",
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
