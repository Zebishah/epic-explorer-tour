import { config } from "dotenv";
import mongoose from "mongoose";

config();

const mongo_URI = process.env.MONGOURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database is connected on Connection String ${mongo_URI}`);
    return conn;
  } catch (err) {
    console.error(`Database connection failed: ${err}`);
    process.exit(1); // Exit the process with an error code
  }
};

export default connectDB;
