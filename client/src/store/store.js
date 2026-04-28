import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupupReducer from "./slices/popUpSlice";
import  userReducer from "./slices/userSlice";
import  bookReducer from "./slices/bookSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupupReducer,
    user: userReducer,
    book: bookReducer
  },
});