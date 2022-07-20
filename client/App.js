import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary.js";
import { CssBaseline, makeStyles } from "@material-ui/core";
import "./style.css";
import Feed from "./components/Feed";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import KitchenEdit from "./components/KitchenEdit";
import SellerSignUp from "./components/SellerSignUp";
import SellerLogin from "./components/SellerLogin";
import Auth from "./components/Auth.js";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import MenuComponent from "./components/MenuComponent.js";

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
  const backgroundClass = `${classes.webmain} background`
  return (
    <Auth>
      <ErrorBoundary>
        <div className={backgroundClass}>
          <CssBaseline />
          <Nav />
          <Routes>
            {/* BODY w/ login/signup */}

            <Route path="/" element={<Body />} />
            {/* <Route path="/login" element={<SellerLogin />} />
              <Route path="/signup" element={<SellerSignUp />} /> */}

            {/* FEED with sellerID */}            
            <Route path="/feed/:sellerId" element={<MenuComponent />}/>

            <Route path="/feed" element={<Feed />} />
            
            <Route path="/MyKitchen" element={<KitchenEdit />} />

            {/* Catch-all */}
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
