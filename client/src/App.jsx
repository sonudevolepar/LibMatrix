import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </Router>
  );
};

export default App;