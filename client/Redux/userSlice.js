import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import AuthThunk from "./globalAction.js";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state) => {
      state.user = {
        userType: Cookies.get("userType"),
        user_id: Cookies.get("userId"),
        zip: Cookies.get("userZip"),
      };
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      Cookies.remove("userId");
      Cookies.remove("userType");
      Cookies.remove("userZip");
      Cookies.remove("token");
      state.user = null;
      state.isAuthenticated = false;
    },
    saveUserType: (state, action) => {
      state.user = { userType: action.payload.userType };
    },
    removeUserType: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthThunk.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload) {
        state.user = { ...action.payload };
        Cookies.set("userId", action.payload.user_id);
        Cookies.set("userZip", action.payload.zip);
        state.isAuthenticated = true;
      }
    });
  },
});

export const { saveUser, logOut, saveUserType, removeUserType } =
  userSlice.actions;
export default userSlice.reducer;
