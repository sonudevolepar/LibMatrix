import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },

  reducers: {
    // 🔹 GET BOOKS
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

    // 🔹 ADD BOOK
    addBookRequest(state) {
      state.loading = true;
    },
    addBookSuccess(state) {
      state.loading = false;
    },
    addBookFailed(state) {
      state.loading = false;
    },

    // 🔹 DELETE BOOK
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
  },
});


// ============================
// 📥 FETCH ALL BOOKS
// ============================
export const fetchBooks = () => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.fetchBooksRequest());

    const res = await axios.get(
      "http://localhost:4000/api/v1/book/all",
      { withCredentials: true }
    );

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
// ➕ ADD NEW BOOK
// ============================
export const addBook = (data) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.addBookRequest());

    const res = await axios.post(
      "http://localhost:4000/api/v1/book/admin/add",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(bookSlice.actions.addBookSuccess());
    toast.success(res.data.message || "Book added");

    // 🔥 auto refresh
    dispatch(fetchBooks());

  } catch (err) {
    dispatch(bookSlice.actions.addBookFailed());
    toast.error(err?.response?.data?.message || "Error");
  }
};


// ============================
// ❌ DELETE BOOK
// ============================
export const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch(bookSlice.actions.deleteBookRequest());

    const res = await axios.delete(
      `http://localhost:4000/api/v1/book/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(bookSlice.actions.deleteBookSuccess(id));
    toast.success(res.data.message || "Book deleted");

  } catch (err) {
    dispatch(bookSlice.actions.deleteBookFailed());
    toast.error(err?.response?.data?.message || "Error");
  }
};


export default bookSlice.reducer;