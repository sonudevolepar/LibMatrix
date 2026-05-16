import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action) {
      state.loading = false;
      state.message = action.payload?.message;
      state.user = action.payload?.user || null;
      state.isAuthenticated = action.payload?.user ? true : false;
    },
    failed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetAuthSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
  },
});

export const {
  request,
  success,
  failed,
  logoutSuccess,
  resetAuthSlice,
} = authSlice.actions;

const API = "https://libmatrix.onrender.com/api/v1/auth";


// 🔵 REGISTER
export const register = (data) => async (dispatch) => {
  try {

    dispatch(request());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${API}/register`,
      data,
      config
    );

    dispatch(success(res.data));

  } catch (error) {

    console.log(error.response?.data);

    dispatch(
      failed(
        error.response?.data?.message ||
        "Register failed"
      )
    );
  }
};
// 🔵 LOGIN
export const login = (data) => async (dispatch) => {
  try {

    dispatch(request());

    console.log("LOGIN DATA:", data);

    const res = await axios.post(
      `${API}/login`,
      data,
      {
        withCredentials: true,
      }
    );

    console.log("LOGIN SUCCESS:", res.data);

    dispatch(success(res.data));

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error.response?.data
    );

    dispatch(
      failed(
        error.response?.data?.message ||
        "Login failed"
      )
    );
  }
};

// 🔵 FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(request());

    const res = await axios.post("https://libmatrix.onrender.com/api/v1/auth/password/forgot", {
      email: email,   // ✅ correct
    });

    dispatch(success(res.data));
  } catch (error) {
    dispatch(failed(error.response?.data?.message || "Error"));
  }
};


// 🔵 VERIFY OTP
export const verifyOTP = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://libmatrix.onrender.com/api/v1/auth/verify-otp",
      data,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "OTP verification failed";
  }
};


// RESET PASSWORD API
export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch(request());   // ✅ correct

      const res = await axios.put(
        `${API}/password/reset/${token}`,
        { password, confirmPassword },
        { withCredentials: true }
      );

      dispatch(success(res.data));   // ✅ correct
    } catch (error) {
      dispatch(
        failed(error.response?.data?.message || "Reset failed") // ✅ correct
      );
    }
  };


// 🔴 LOGOUT
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${API}/logout`, { withCredentials: true });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(failed(error.response?.data?.message || "Logout failed"));
  }
};


// 🔵 GET CURRENT USER
export const getUser = () => async (dispatch) => {
  try {
    dispatch(request());

    const res = await axios.get(
      "https://libmatrix.onrender.com/api/v1/auth/me",
      { withCredentials: true }
    );

    dispatch(success(res.data)); // user + message set ho jayega
  } catch (error) {
    dispatch(
      failed(error.response?.data?.message || "Failed to load user")
    );
  }
};

// export const logout = () => async (dispatch) => {
//   try {
//     await axios.get("https://libmatrix.onrender.com/api/v1/auth/logout", {
//       withCredentials: true,
//     });

//     dispatch(logoutSuccess());
//   } catch (error) {
//     dispatch(failed(error.response?.data?.message || "Logout failed"));
//   }
// };

export default authSlice.reducer;