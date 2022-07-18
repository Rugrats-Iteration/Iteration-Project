import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../Redux/userSlice.js";

const Auth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [captureUserZip, setCaptureUserZip] = useState(null);
  const [displayChildren, setDisplayChildren] = useState(false);
  const publicRoutes = ["/", "/login", "/signup"];
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (publicRoutes.includes(location.pathname)) {
      if (location.pathname === "/" && isAuthenticated) {
        nav("/feed");
      }
      setDisplayChildren(true);
    }
    if (!isAuthenticated) {
      const userType = Cookies.get("userType");
      console.log(userType, "tell me sm");
      userType ? setCaptureUserZip({ userType }) : nav("/");
    } else setDisplayChildren(true);
  }, [isAuthenticated]);

  useEffect(() => {
    if (captureUserZip) dispatch(saveUser());
  }, [captureUserZip]);

  return <>{displayChildren && children}</>;
};

export default Auth;
