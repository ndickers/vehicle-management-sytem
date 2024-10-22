import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AdminLoginState {
  user: any;
  token: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

export const adminLogin = createAsyncThunk(
  "/login/admin",
  async (loginDetails: any, thunkApi) => {
    try {
      const response = await axios.post(
        "https://vehicle-management-sytem.onrender.com/login",
        loginDetails
      );

      console.log({ res: response.data });

      localStorage.setItem("admin", JSON.stringify(response.data.user[0]));
      localStorage.setItem("role", "admin");
      localStorage.setItem("adminToken", response.data.token);
      //can store in local storage
      return response.data;
    } catch (error) {
      if (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);

const initialState: AdminLoginState = {
  user: JSON.parse(localStorage.getItem("admin") ?? "null"),
  token: localStorage.getItem("adminToken") || null,
  role: localStorage.getItem("role") || null,
  loading: false,
  error: null,
};
const adminLoginSlice = createSlice({
  name: "loginAdmin",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.user = action.payload.user[0];
        state.token = action.payload.token;
        state.role = "admin";
        state.loading = false;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.role = null;
        state.user = null;
        state.token = null;
      });
  },
});
export const { logout } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
