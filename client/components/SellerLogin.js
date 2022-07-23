const axios = require("axios");
// const fetch = require('node-fetch');
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import { CardContent, Paper, TextField, Typography } from "@material-ui/core";
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

  // set form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    isAuthenticated && navigate("/feed");
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      Cookies.set("userId", user.user_id);
      Cookies.set("userZip", user.zip);
      Cookies.set("userType", "seller");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    dispatch(
      globalAsyncThunk({
=======

    axios
      .post('/api/login', {
>>>>>>> imma/menuController
        username,

        password,
<<<<<<< HEAD
        userType: "seller",
        url: "auth/login",
        method: "POST",
=======
        // userType: 'buyer',
>>>>>>> imma/menuController
      })
    );
    // .then((response) => {
    //   // if user_id sent, success
    //   if (response.data.user_id) {
    //     props.setIsLoggedIn(true);
    //     props.setUserType("seller");
    //     props.setUserZip(response.data.zip);
    //     props.setUserId(response.data.user_id);
    //     document.cookie = `userId=${response.data.user_id}`;
    //     document.cookie = `userZip=${response.data.zip}`;
    //     document.cookie = `userType=seller`;
    //   } else console.log(response.data);
    // })
    // .catch((error) => {
    //   // handle error
    //   console.log("hit error response");
    //   console.log(error);
    // })
    // .then(() => {
    //   // always executed
    // });
  };

  return (
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <form className={classes.root} onSubmit={handleSubmit}>
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
