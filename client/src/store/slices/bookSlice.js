import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:4000/api/v1/book";

const initialState = {
  books: [],
  singleBook: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,

  reducers: {
    // 🔄 COMMON REQUEST
    request(state) {
      state.loading = true;
      state.error = null;
    },

    // ❌ COMMON ERROR
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // 📚 FETCH ALL BOOKS
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },

    // 📘 SINGLE BOOK
    fetchSingleBookSuccess(state, action) {
      state.loading = false;
      state.singleBook = action.payload;
    },

    // ➕ ADD BOOK
    addBookSuccess(state) {
      state.loading = false;
    },

    // ❌ DELETE BOOK
    deleteBookSuccess(state, action) {
      state.loading = false;
      state.books = state.books.filter(
        (book) => book._id !== action.payload
      );
    },

    // 📥 BORROW
    borrowBookSuccess(state, action) {

      const book = state.books.find(
        (b) => b._id === action.payload
      );

      if (book) {
        book.availability = false;
      }
    },

    returnBookSuccess(state, action) {

      const book = state.books.find(
        (b) => b._id === action.payload
      );

      if (book) {
        book.availability = true;
      }
    },

    clearError(state) {
      state.error = null;
    },
  },
});


// ============================
// 📥 FETCH ALL BOOKS
// ============================
export const fetchBooks = () => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.request());

    const res = await axios.get(`${API}/all`, {
      withCredentials: true,
    });

    dispatch(
      bookSlice.actions.fetchBooksSuccess(
        res.data.books
      )
    );
  } catch (err) {
    dispatch(
      bookSlice.actions.failed(
        err.response?.data?.message || "Error"
      )
    );
  }
};


// ============================
// 📘 FETCH SINGLE BOOK
// ============================
export const fetchSingleBook = (id) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.request());

    const res = await axios.get(`${API}/${id}`);

    dispatch(
      bookSlice.actions.fetchSingleBookSuccess(
        res.data.book
      )
    );
  } catch (err) {
    dispatch(
      bookSlice.actions.failed("Failed to load book")
    );
    toast.error("Failed to load book");
  }
};


// ============================
// ➕ ADD BOOK
// ============================
export const addBook = (data) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.request());

    const res = await axios.post(
      `${API}/admin/add`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(bookSlice.actions.addBookSuccess());
    toast.success(res.data.message);

    // 🔄 refresh list
    dispatch(fetchBooks());

  } catch (error) {
    dispatch(
      bookSlice.actions.failed(
        error.response?.data?.message || "Error"
      )
    );

    toast.error(
      error.response?.data?.message || "Error"
    );
  }
};


// ============================
// ❌ DELETE BOOK
// ============================
export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.request());

    const res = await axios.delete(
      `${API}/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(
      bookSlice.actions.deleteBookSuccess(id)
    );

    toast.success(res.data.message);

  } catch (error) {
    dispatch(
      bookSlice.actions.failed(
        error.response?.data?.message || "Delete failed"
      )
    );

    toast.error(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};


// ============================
// 📥 BORROW BOOK
// ============================
export const borrowBook = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API}/borrow/${id}`,
      {},
      { withCredentials: true }
    );

    dispatch(
      bookSlice.actions.borrowBookSuccess(id)
    );

    toast.success(res.data.message || "Book borrowed");

    // 🔄 optional refresh
    dispatch(fetchBooks());

  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Error"
    );
  }
};


// ============================
// 🔁 RETURN BOOK
// ============================
export const returnBook = (id) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API}/return/${id}`,
      {},
      { withCredentials: true }
    );

    dispatch(
      bookSlice.actions.returnBookSuccess(id)
    );

    toast.success(res.data.message || "Book returned");

    // 🔄 optional refresh
    dispatch(fetchBooks());

  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Error"
    );
  }
};


export const { clearError } = bookSlice.actions;

export default bookSlice.reducer;