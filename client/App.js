import Auth from "./components/Auth.js";
import Body from "./components/Body";
import Feed from "./components/Feed";
import KitchenEdit from "./components/KitchenEdit";
import Login from "./components/Login";
import Nav from "./components/Nav";
import React from "react";
import SignUp from "./components/SignUp";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "./components/ErrorBoundary.js";
import { CssBaseline, makeStyles } from "@material-ui/core";
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
