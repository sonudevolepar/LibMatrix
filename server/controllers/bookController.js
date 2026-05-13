import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { Borrow } from "../models/borrowModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { v2 as cloudinary } from "cloudinary";

// ================= ADD BOOK =================

export const addBook = catchAsyncErrors(
  async (req, res, next) => {

    const {
      title,
      author,
      description,
      price,
      quantity,
    } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      !price ||
      !quantity
    ) {
      return next(
        new ErrorHandler(
          "Please fill all fields.",
          400
        )
      );
    }

    if (!req.file) {
      return next(
        new ErrorHandler(
          "Book image is required.",
          400
        )
      );
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "BOOKS",
      }
    );

    const book = await Book.create({
      title,
      author,
      description,
      price,
      quantity,

      availability: quantity > 0,

      bookImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully.",
      book,
    });
  }
);

// ================= GET ALL BOOKS =================

export const getAllBooks = catchAsyncErrors(
  async (req, res, next) => {

    const books = await Book.find();

    res.status(200).json({
      success: true,
      books,
    });
  }
);

// ================= DELETE BOOK =================

export const deleteBook = catchAsyncErrors(
  async (req, res, next) => {

    const book = await Book.findById(
      req.params.id
    );

    if (!book) {
      return next(
        new ErrorHandler(
          "Book not found",
          404
        )
      );
    }

    if (book.bookImage?.public_id) {

      await cloudinary.uploader.destroy(
        book.bookImage.public_id
      );

    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  }
);

// ================= BORROW BOOK =================

export const borrowBook = catchAsyncErrors(
  async (req, res, next) => {

    const book = await Book.findById(
      req.params.id
    );

    if (!book) {
      return next(
        new ErrorHandler(
          "Book not found",
          404
        )
      );
    }

    if (book.quantity <= 0) {
      return next(
        new ErrorHandler(
          "Book not available",
          400
        )
      );
    }

    const user = await User.findById(req.user.id);

    const dueDate = new Date();

    dueDate.setDate(
      dueDate.getDate() + 7
    );

    await Borrow.create({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      book: book._id,
      dueDate,
      borrowDate: new Date(),
    });

    user.borrowedBooks.push({
      bookId: book._id,
      bookTitle: book.title,
      borrowedDate: new Date(),
      dueDate,
      returned: false,
    });

    await user.save();

    book.quantity -= 1;

    if (book.quantity === 0) {
      book.availability = false;
    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    });
  }
);

// ================= RETURN BOOK =================

export const returnBook = catchAsyncErrors(
  async (req, res, next) => {

    const borrow = await Borrow.findById(
      req.params.id
    );

    if (!borrow) {
      return next(
        new ErrorHandler(
          "Borrow record not found",
          404
        )
      );
    }

    const book = await Book.findById(
      borrow.book
    );

    if (book) {
      book.quantity += 1;
      book.availability = true;
      await book.save();
    }

    borrow.returnDate = new Date();

    await borrow.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  }
);