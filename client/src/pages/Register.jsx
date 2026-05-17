import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, error, message } = useSelector(
    (state) => state.auth
  );

  // ================= STATES =================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= REGISTER =================

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("REGISTER CLICKED");

    const data = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    console.log("REGISTER DATA:", data);

    dispatch(register(data));
  };

  // ================= REDIRECT =================

  useEffect(() => {
    if (message) {
      navigateTo(`/otp/${email}`);
    }
  }, [message]);

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <img
          src={logo}
          alt="logo"
          style={styles.logo}
        />

        <h2 style={styles.heading}>
          Register
        </h2>

        <form
          onSubmit={handleRegister}
          style={styles.form}
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        {message && (
          <p style={styles.success}>
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default Register;

// ================= CSS =================

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #f5f7fa, #e4e8eb)",
  },

  card: {
    width: "380px",
    padding: "35px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  logo: {
    width: "90px",
    marginBottom: "10px",
  },

  heading: {
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
  },

  button: {
    padding: "14px",
    background:
      "linear-gradient(to right, #111827, #1f2937)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
  },

  error: {
    color: "red",
    marginTop: "12px",
  },

  success: {
    color: "green",
    marginTop: "12px",
  },
};