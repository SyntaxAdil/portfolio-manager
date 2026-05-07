import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Check your MONGODB_URI ");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cached.con) {
      return cached.con;
    }
    if (!cached.promise) {
      cached.promise = mongoose.connect(uri);
    }

    cached.con = await cached.promise;
    console.log("DB connect successful");
    return cached.con;
  } catch (error) {
    console.log("DB connect Failed");
  }
};

export default connectDB;
