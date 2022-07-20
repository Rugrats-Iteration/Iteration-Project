import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import userReducer from "./userSlice.js";


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
