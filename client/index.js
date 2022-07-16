// import { counter } from '@fortawesome/fontawesome-svg-core';
import React from "react";
// import { render } from 'react-dom';
import { createRoot } from "react-dom/client";
import App from "./App";
// import map from './components/Map'
import { BrowserRouter } from "react-router-dom";

import { store } from "./Redux/store.js";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App tab="home" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
