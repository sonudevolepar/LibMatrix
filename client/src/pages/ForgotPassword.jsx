import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();   // ✅ yahi hona chahiye

  const { loading, error, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());

      // ✅ redirect to OTP page
      navigate(`/otp/${email}`);
    }
  }, [error, message, dispatch, navigate, email]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Send OTP
        </button>

        <p className="text-sm text-center mt-3">
          <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;