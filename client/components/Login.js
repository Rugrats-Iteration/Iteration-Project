import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import globalAsyncThunk from "../Redux/globalAction";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  signupstack: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    margin: "30px auto auto 0px",
    left: "20%",
    right: "20%",
    zIndex: "1",
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      Cookies.set("userId", user._id);
      Cookies.set("userZip", user.zip);
      Cookies.set("userType", user.userType);
    }
  }, [user]);

  useEffect(() => {
    isAuthenticated && navigate("/feed");
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      globalAsyncThunk({
        username,
        password,
        url: "login",
        method: "POST",
      })
    );
  };

  return (
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <form className={classes.root}>
          <h2> Log In </h2>
          <Stack spacing={2}>
            <TextField
              label=" Username / Email"
              // variant='filled'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              // variant='filled'
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              // variant='contained'
              onClick={handleSubmit}
              color="primary"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
