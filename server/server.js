import 'dotenv/config';  

import { app } from "./app.js";
import { dbConnection } from "./database/db.js";
import { v2 as cloudinary} from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

console.log("SECRET:", process.env.JWT_SECRET); 

dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
