import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 👉 BASE URL (change according to your backend)
const BASE_URL = "http://localhost:4000/api/v1/borrow/my-borrowed-books";

// ==============================
// 📌 GET USER BORROWED BOOKS
// ==============================
export const getUserBorrowedBooks = createAsyncThunk(
  "borrow/getUserBorrowedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/borrow/my`, {
        withCredentials: true,
      });
      return data.borrowedBooks;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 📌 GET ALL BORROWED BOOKS (ADMIN)
// ==============================
export const getAllBorrowedBooks = createAsyncThunk(
  "borrow/getAllBorrowedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/borrow/all`, {
        withCredentials: true,
      });
      return data.borrowedBooks;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 📌 BORROW BOOK
// ==============================
export const borrowBook = createAsyncThunk(
  "borrow/borrowBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/borrow`,
        { bookId },
        {
          withCredentials: true,
        }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 📌 RETURN BOOK
// ==============================
export const returnBook = createAsyncThunk(
  "borrow/returnBook",
  async (borrowId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/borrow/return/${borrowId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==============================
// 📌 SLICE
// ==============================
const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
  },
  reducers: {
    clearBorrowState(state) {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ================= USER BOOKS =================
      .addCase(getUserBorrowedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.userBorrowedBooks = action.payload;
      })
      .addCase(getUserBorrowedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ALL BOOKS =================
      .addCase(getAllBorrowedBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.allBorrowedBooks = action.payload;
      })
      .addCase(getAllBorrowedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= BORROW =================
      .addCase(borrowBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= RETURN =================
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==============================
export const { clearBorrowState } = borrowSlice.actions;
export default borrowSlice.reducer;