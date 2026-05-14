import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const createAdmin = createAsyncThunk(
  "user/createAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/admin/create", // 🔁 change if needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchAllUsersRequest(state) {
      state.loading = true;
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewAdminRequest(state) {
      state.loading = true;
    },
    addNewAdminSuccess(state) {
      state.loading = false;
    },
    addNewAdminFailed(state) {
      state.loading = false;
    },
  },
});

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(userSlice.actions.fetchAllUsersRequest());

    const res = await axios.get(
      "https://libmatrix.onrender.com/api/v1/user/all",
      { withCredentials: true }
    );

    dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));
  } catch (err) {
    dispatch(
      userSlice.actions.fetchAllUsersFailed(
        err.response?.data?.message || "Error"
      )
    );
  }
};

export const addNewAdmin = (data) => async (dispatch) => {
  try {
    dispatch(userSlice.actions.addNewAdminRequest());

    const res = await axios.post(
      "https://libmatrix.onrender.com/api/v1/user/add/new-admin",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(userSlice.actions.addNewAdminSuccess());
    toast.success(res.data.message);
  } catch (err) {
    dispatch(userSlice.actions.addNewAdminFailed());
    toast.error(err?.response?.data?.message || "Something went wrong");
  }
};

export default userSlice.reducer;