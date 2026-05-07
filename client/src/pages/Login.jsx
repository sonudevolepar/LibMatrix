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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

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
      navigate("/");
    }
  }, [error, message, isAuthenticated, dispatch, navigate]);

  return (
    <div className="flex h-screen">

      {/* 🔷 LEFT SIDE */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">

        <h2 className="text-2xl font-bold mb-2">Welcome Back !!</h2>
        <p className="text-gray-500 mb-6">
          Please enter your credentials to log in
        </p>

        <form onSubmit={handleLogin} className="w-80">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />

          <div className="text-sm mb-3">
            <Link to="/password/forgot" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>

        </form>
      </div>

      {/* 🔷 RIGHT SIDE (VIDEO STYLE BLACK PANEL) */}
      <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center rounded-l-[80px]">

        <h1 className="text-3xl font-bold mb-2">BookWorm</h1>
        <p className="text-gray-300 mb-6">
          New to our platform? Sign up now.
        </p>

        <Link to="/register">
          <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
            SIGN UP
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Login;