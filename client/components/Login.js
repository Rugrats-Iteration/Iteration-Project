import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../Redux/userSlice.js";

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

export default function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      props.setIsLoggedIn(isAuthenticated);
      props.setUserType("buyer");
      props.setUserZip(user.zip);
      props.setUserId(user.user_id);
      document.cookie = `userId=${user.user_id}`;
      document.cookie = `userZip=${user.zip}`;
      document.cookie = `userType=buyer`;
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(auth({ username, password, userType: "buyer", mode: "login" }));
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
