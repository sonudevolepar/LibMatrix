import mongoose from "mongoose";


export const dbConnection = () => {
  try {
    await mongodb.connect(process.env.MONGO_URI);
    console.log("connection successfull to DB");
  } catch (error) {
    console.error(error);
    console.error("connection failed to db");
    process.exit(0);
  }
};