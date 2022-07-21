import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import Cookies from "js-cookie";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveUserType } from "../Redux/userSlice.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
  },
}));
export default function UserTypeSelector(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //tracks errors if incorrect zipcode format is entered
  const types = { customer: "customer", kitchen: "kitchen" };
  //store userid in state

  const setUser = (type) => {
    dispatch(saveUserType({ userType: type }));
    Cookies.set("userType", type);
  };

  return (
    <div>
      <Paper elevation={5} sx={{ p: 2 }} className={classes.paper}>
        <h1>Are you a customer or a kitchen?</h1>
        <Stack spacing={2}>
          <Button
            color="primary"
            variant="contained"
            value="customer"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setUser(types.customer);
            }}
          >
            Customer
          </Button>

          <Button
            color="secondary"
            variant="contained"
            type="submit"
            value="kitchen"
            onClick={(e) => {
              e.preventDefault();
              setUser(types.kitchen);
            }}
          >
            Kitchen
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
