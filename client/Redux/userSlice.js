import { createSlice } from "@reduxjs/toolkit";
import fetcher from "../lib/fetcher.js";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: async (state, action) => {
      const data = await fetcher(`signup`, {
        username: action.payload.username,
        password: action.payload.password,
        userType: action.payload.userType,
        email: action.payload.email,
      });
      if (data) {
        state.user = data;
        state.isAuthenticated = true;
      }
    },
    getUser: async (state, action) => {
      console.log(action.payload);
      const data = await fetcher(`auth/login`, {
        username: action.payload.username,
        password: action.payload.password,
        userType: action.payload.userType,
      });

      if (data) {
        state.user = data;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { createUser, getUser } = userSlice.actions;

export default userSlice.reducer;
