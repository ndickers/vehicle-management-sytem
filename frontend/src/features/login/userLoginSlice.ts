
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserLoginState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  role: string | null;
}

export const userLogin = createAsyncThunk<any, any, { rejectValue: any }>(
  "/login/user",
  async (loginDetails: any, thunkApi) => {
    try {
      const response = await axios.post(
        "https://vehicle-management-sytem.onrender.com/login",
        loginDetails
      );

      console.log({ res: response.data });

      localStorage.setItem("user", JSON.stringify(response.data.user[0]));
      localStorage.setItem("role", "user");
      localStorage.setItem("authToken", response.data.token);
      //can store in local storage
      return response.data;
    } catch (error) {
      if (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  }
);

const initialState: UserLoginState = {
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("role") || null,
  loading: false,
  error: null,
};

const userLoginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user[0];
        state.token = action.payload.token;
        state.role = "user";
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.role = null;
        state.user = null;
        state.token = null;
      });
  },
});

export default userLoginSlice.reducer;
