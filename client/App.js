import "./style.css";
import Auth from "./components/Auth.js";
import Body from "./components/Body";
import Feed from "./components/Feed";
import KitchenEdit from "./components/KitchenEdit";
import MenuComponent from "./components/MenuComponent.js";
import Nav from "./components/Nav";
import React from "react";

import { useSelector } from "react-redux";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ErrorBoundary } from "./components/ErrorBoundary.js";
import { Routes, Route, Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  webmain: {
    backgroundColor: "#686de0",
    color: "black",
  },
}));

// create App
const App = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.user);
  const backgroundClass = `${classes.webmain} background`;
  return (
    <Auth>
      <ErrorBoundary>
        <div className={backgroundClass}>
          <CssBaseline />
          <Nav />
          <Routes>
            {/* BODY w/ login/signup */}
            <Route path="/" element={<Body />} />

            <Route path="/feed" element={<Feed />} />

            {/* FEED with sellerID */}
            <Route path="/feed/:sellerId" element={<MenuComponent />} />

            <Route path="/MyKitchen" element={<KitchenEdit />} />

            {/* Catch-all */}
            <Route
              path="/*"
              element={
                <Navigate to={isAuthenticated ? "/feed" : "/"} replace />
              }
            />
          </Routes>
        </div>
      </ErrorBoundary>
    </Auth>
  );
};
// export App
export default App;
