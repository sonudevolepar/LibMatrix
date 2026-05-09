import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:4000/api/v1/book";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    singleBook: null,   // 🔥 NEW
    loading: false,
    error: null,
  },

  reducers: {
    // 🔹 FETCH ALL
    fetchBooksRequest(state) {
      state.loading = true;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 FETCH SINGLE
    fetchSingleBookSuccess(state, action) {
      state.loading = false;
      state.singleBook = action.payload;
    },

    // 🔹 ADD
    addBookRequest(state) {
      state.loading = true;
    },
    addBookSuccess(state) {
      state.loading = false;
    },
    addBookFailed(state) {
      state.loading = false;
    },

    // 🔹 DELETE
    deleteBookRequest(state) {
      state.loading = true;
    },
    deleteBookSuccess(state, action) {
      state.loading = false;
      state.books = state.books.filter(
        (book) => book._id !== action.payload
      );
    },
    deleteBookFailed(state) {
      state.loading = false;
    },

    // 🔹 BORROW BOOK (NEW 🔥)
    borrowBookSuccess(state, action) {
      const book = state.books.find(b => b._id === action.payload);
      if (book) book.available = false;
    },

    // 🔹 RETURN BOOK (NEW 🔥)
    returnBookSuccess(state, action) {
      const book = state.books.find(b => b._id === action.payload);
      if (book) book.available = true;
    },

    // 🔹 RESET
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
    dispatch(bookSlice.actions.fetchBooksRequest());

    const res = await axios.get(`${API}/all`, {
      withCredentials: true,
    });

    dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
  } catch (err) {
    dispatch(
      bookSlice.actions.fetchBooksFailed(
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
    dispatch(bookSlice.actions.fetchBooksRequest());

    const res = await axios.get(`${API}/${id}`);

    dispatch(
      bookSlice.actions.fetchSingleBookSuccess(res.data.book)
    );
  } catch (err) {
    toast.error("Failed to load book");
  }
};


// ============================
// ➕ ADD BOOK
// ============================
export const addBook = (data) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.addBookRequest());

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

    dispatch(fetchBooks());

  } catch (error) {

    console.log(error.response?.data);

    dispatch(bookSlice.actions.addBookFailed());

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

    dispatch(
      bookSlice.actions.deleteBookRequest()
    );

    const { data } = await axios.delete(
      `${API}/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch(
      bookSlice.actions.deleteBookSuccess(id)
    );

    toast.success(data.message);

  } catch (error) {

    dispatch(
      bookSlice.actions.deleteBookFailed()
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

    dispatch(bookSlice.actions.borrowBookSuccess(id));
    toast.success(res.data.message || "Book borrowed");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Error");
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

    dispatch(bookSlice.actions.returnBookSuccess(id));
    toast.success(res.data.message || "Book returned");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Error");
  }
};


export const { clearError } = bookSlice.actions;

export default bookSlice.reducer;