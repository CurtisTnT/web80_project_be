import mongoose from "mongoose";

const connectDatabase = async () => {
  const MONGO_CONNECT = `${process.env.MONGO_URI}/${process.env.MONGO_DATABASE}`;
  try {
    mongoose.connect(MONGO_CONNECT);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connectDatabase;
