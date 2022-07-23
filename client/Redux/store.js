import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import userReducer from "./userSlice.js";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: persistReducer(persistConfig, cartReducer),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

const persistor = persistStore(store);

export {store, persistor};
