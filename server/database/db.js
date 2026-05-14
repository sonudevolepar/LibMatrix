import mongoose from "mongoose";

export const dbConnection = async () => {
  try {

    mongoose.set("bufferCommands", false);

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_LIBRARY",
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("Connection successful to DB");

  } catch (error) {

    console.error("Connection failed to DB");
    console.error(error);

    process.exit(1);
  }
};