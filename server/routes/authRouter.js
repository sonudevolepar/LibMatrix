import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  getMyProfile,
  forgotPassword,
  resetPassword,
  updatePassword
} from "../controllers/authController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router(); // ✅ ALWAYS FIRST

// routes
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);

export default router;