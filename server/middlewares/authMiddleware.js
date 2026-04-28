import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddlewares.js";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // 🔥 अगर header से आ रहा हो (Postman case)
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN:", token);
    console.log("TOKEN TYPE:", typeof token);
    console.log("SECRET:", process.env.JWT_SECRET_KEY);

    if (!token) {
      return next(new ErrorHandler("User is not authenticated.", 401));
    }

    // 🔥 IMPORTANT FIX (format issue solve karega)
    token = token.trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("DECODED:", decoded);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return next(new ErrorHandler(error.message, 401));
  }
};


export const isAuthorized = (...roles)=> {
  return (req, res, next) => {

    const userRole = req.user.role.trim().toLowerCase();

    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return next(
        new ErrorHandler(
          `User with this role ${req.user.role} not allowed to access this resource.`,
          403
        )
      );
    }
    console.log("USER:", req.user);
console.log("ROLE:", req.user.role);

    next();
  };
};

