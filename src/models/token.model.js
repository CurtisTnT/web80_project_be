import mongoose from "mongoose";

import { Collections } from "../database/collections.js";

const tokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Collections.users,
  },
});

const TokenModel = mongoose.model(Collections.tokens, tokenSchema);

export default TokenModel;
