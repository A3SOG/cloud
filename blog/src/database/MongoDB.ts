import mongoose from "mongoose";
import { DB_URL } from "../config";

const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL as string);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(`An error occurred: ${error}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
