import express from "express";

import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

import { upload } from "../middlewares/multer.js";

import {
  addBook,
  deleteBook,
  getAllBooks,
  borrowBook,
  returnBook,
} from "../controllers/bookController.js";

const router = express.Router();

// ================= ADD BOOK =================

router.post(
  "/admin/add",
  isAuthenticated,
  isAuthorized("Admin"),
  upload.single("image"),
  addBook
);

// ================= GET ALL BOOKS =================

router.get(
  "/all",
  isAuthenticated,
  getAllBooks
);

// ================= DELETE BOOK =================

router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  deleteBook
);

// ================= BORROW BOOK =================

router.post(
  "/borrow/:id",
  isAuthenticated,
  borrowBook
);

// ================= RETURN BOOK =================

router.post(
  "/return/:id",
  isAuthenticated,
  returnBook
);

export default router;