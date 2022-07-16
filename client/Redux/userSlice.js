import { createSlice } from "@reduxjs/toolkit";

import AuthThunk from "./globalAction.js";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AuthThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
  },
});

export default userSlice.reducer;
