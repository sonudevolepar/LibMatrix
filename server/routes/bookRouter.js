import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

import {
  addBook,
  deleteBook,
  getAllBooks,
} from "../controllers/bookController.js";

const router = express.Router();

router.post(
  "/admin/add",
  isAuthenticated,
  isAuthorized("Admin"),
  upload.single("image"),
  addBook
);

router.get("/all", isAuthenticated, getAllBooks);

router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  deleteBook
);

export default router;