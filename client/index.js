// import { counter } from '@fortawesome/fontawesome-svg-core';
import React from "react";
// import { render } from 'react-dom';
import { createRoot } from "react-dom/client";
import App from "./App";
// import map from './components/Map'
import { BrowserRouter } from "react-router-dom";

import { store, persistor } from "./Redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App tab="home" />
    </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
