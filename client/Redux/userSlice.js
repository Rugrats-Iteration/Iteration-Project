import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "../lib/fetcher.js";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const auth = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    const response = await fetcher(`auth/` + payload.mode, payload);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export default userSlice.reducer;
