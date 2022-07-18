import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary.js";
import { CssBaseline, makeStyles } from "@material-ui/core";

import Feed from "./components/Feed";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import KitchenEdit from "./components/KitchenEdit";

import Auth from "./components/Auth.js";
import { useSelector } from "react-redux";
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

  return (
    <Auth>
      <ErrorBoundary>
        <div className={classes.webmain}>
          <CssBaseline />
          <Nav />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route path="/feed" element={<Feed />}>
              <Route path="/feed/:sellerId" />
            </Route>
            <Route path="/MyKitchen" element={<KitchenEdit />} />
            <Route path="/feed/:id" element={<SignUp />} />

            <Route
              path="/*"
              element={
                <Navigate to={isAuthenticated ? "/feed" : "/"} replace={true} />
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
