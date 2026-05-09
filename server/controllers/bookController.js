import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { v2 as cloudinary } from "cloudinary";

// ================= ADD BOOK =================

export const addBook = catchAsyncErrors(
  async (req, res, next) => {

    console.log(req.body);
    console.log(req.file);

    const {
      title,
      author,
      description,
      price,
      quantity,
    } = req.body;

    // VALIDATION
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

    // IMAGE CHECK
    if (!req.file) {
      return next(
        new ErrorHandler(
          "Book image is required.",
          400
        )
      );
    }

    // CLOUDINARY UPLOAD
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "BOOKS",
      }
    );

    console.log(result);
      
    // CREATE BOOK
    const book = await Book.create({
      title,
      author,
      description,
      price,
      quantity,

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

    // cloudinary image delete
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