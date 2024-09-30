import bcrypt from "bcrypt";

import UserModel from "../models/user.model.js";

const salt = bcrypt.genSaltSync();

export const createSuperAdmin = async () => {
  try {
    const userCount = await UserModel.countDocuments();
    if (!userCount) {
      const defaultPassword = "12345678";

      const hashedPassword = bcrypt.hashSync(defaultPassword, salt);

      await UserModel.create({
        firstName: "Admin",
        lastName: "1",
        email: "admin1@gmail.com",
        phoneNumber: "0987654321",
        password: hashedPassword,
        role: "admin",
        designationLevel: "management",
        jobTitle: "productOwner",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
