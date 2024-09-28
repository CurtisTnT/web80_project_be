import mongoose from "mongoose";

import { Collections } from "../database/collections.js";

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

const OtpModel = mongoose.model(Collections.otp, otpSchema);

export default OtpModel;
