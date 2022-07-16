import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Auth = ({ children }) => {
  const id = Cookies.get("userId");
  const zip = Cookies.get("userZip");
  const type = Cookies.get("userType");
};
export default Auth;
