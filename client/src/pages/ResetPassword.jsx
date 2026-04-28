import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/black-logo.png";

import { resetPassword, resetAuthSlice } from "../store/slices/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { loading, error, message } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/login");
    }
  }, [error, message, dispatch, navigate]);

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-black text-white flex-col justify-center items-center p-10 rounded-r-3xl">
        <img src={logo} alt="logo" className="mb-6 w-16" />
        <h2 className="text-2xl font-semibold mb-2">BookWorm Library</h2>
        <p className="text-gray-300 text-center max-w-sm">
          "Your premier digital library for borrowing and reading books"
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-80"
        >
          <h2 className="text-xl font-semibold mb-2 text-center">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Enter your new password
          </p>

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 mb-4 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:opacity-90"
          >
            {loading ? "Resetting..." : "RESET PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;