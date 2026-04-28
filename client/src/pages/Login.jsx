import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🔹 input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 submit handler
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // 🔹 side effects
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }

    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }

    if (isAuthenticated) {
      navigate("/"); // home page
    }
  }, [error, message, isAuthenticated, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Links */}
        <div className="flex justify-between mt-3 text-sm">
          <Link to="/password/forgot" className="text-blue-500">
            Forgot Password?
          </Link>

          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;