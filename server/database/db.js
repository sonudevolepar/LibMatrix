import mongoose from "mongoose";


export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "MERN_STACK_LIBRARY",
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
};