import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cooking from "../assets/cooking.jpg";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";
import SignUp from "./SignUp";
import Login from "./Login";
import UserTypeSelector from "./UserTypeSelector";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUserType } from "../Redux/userSlice.js";

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: "cover",
    backgroundRepeat: "none",
    backgroundColor: "transparent",
    padding: "0px 20px",
  },
  heavyFont: {
    color: "white",
    fontWeight: "900",
    fontSize: "40px",
    fontFamily: "Nunito",
  },
  buttonNest: {
    display: "flex",
    margin: "0px 10px",
  },
  bottomText: {
    fontSize: "25px",
    position: "absolute",
    bottom: "0",
    left: "20px",
    color: "white",
  },
  textLink: {
    color: "red",
  },
}));

export default function Body() {
  //Declare variables and state
  const classes = useStyles();
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [randomGreeting, setGreeting] = useState("");
  const { user } = useSelector((state) => state.user);

  let signUpModule;

  //Sign-up Card Display Function
  const signUpFunc = (action) => {
    if (action == "sign") {
      console.log("Button Clicked, sign up was ", signUp);
      setSignUp(!signUp);
      console.log("Sign up is now ", signUp);
    } else {
      setLogin(!logIn);
    }
  };

  useEffect(() => {
    // choose welcome text
    const greetings = [
      "cooking is",
      "banana bread is",
      "world famous meatballs are",
      "apple pie is",
      "ravioli is",
      "soul food is",
      "[ insert yummy food here ] is",
    ];

    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);
  //Return back to DOM
  return (
    <div className={classes.body}>
      <h1 className={classes.heavyFont}>
        {" "}
        {`Grandma's ${randomGreeting} just a button press away`}
      </h1>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            signUpFunc("sign");
            setSignUp(true);
            setLogin(false);
          }}
        >
          Sign up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            signUpFunc("log");
            setLogin(true);
            setSignUp(false);
            dispatch(removeUserType());
          }}
        >
          Login
        </Button>
      </Stack>
      {!user && signUp ? (
        <UserTypeSelector />
      ) : signUp && user ? (
        <SignUp />
      ) : (
        <Login />
      )}
    </div>
  );
}

// first display the buttons when the user clicks on either signup or signin buttons
// then display either signup or signin
