import mongoose from "mongoose";

import { Collections } from "../database/collections.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "lead", "staff"],
      required: true,
    },
    designationLevel: {
      type: String,
      enum: ["intern", "entry", "middle", "senior", "management"],
      default: null,
    },
    jobTitle: {
      type: String,
      enum: [
        "feDev",
        "beDev",
        "fullStackDev",
        "devops",
        "uxUiDesigner",
        "businessAnalyst",
        "dataAnalyst",
        "productOwner",
      ],
      default: null,
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Collections.users,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.virtual("createdBy", {
  ref: Collections.users,
  localField: "createdById",
  foreignField: "_id",
  justOne: true,
});

const UserModel = mongoose.model(Collections.users, userSchema);

export default UserModel;
