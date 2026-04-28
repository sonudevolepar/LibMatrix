import React, { useState } from "react";
import logo from "../assets/black-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../store/slices/authSlice"; // make sure correct path

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleRegister = (e) => {
    e.preventDefault();

    const data = { name, email, password };

    dispatch(register(data));
  };

  // redirect after success
  if (isAuthenticated) {
    navigateTo("/");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="logo" style={styles.logo} />

        <h2>Register</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </div>
  );
};

export default Register;

// Simple CSS-in-JS
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  logo: {
    width: "80px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};