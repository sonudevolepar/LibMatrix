import dotenv from "dotenv";

dotenv.config({
  path: "./config/config.env",
});
// dotenv.config();

import { app } from "./app.js";

import { v2 as cloudinary } from "cloudinary";

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// TEST SECRET
console.log(
  "SECRET:",
  process.env.JWT_SECRET_KEY
);

// SERVER START
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`
  );
});