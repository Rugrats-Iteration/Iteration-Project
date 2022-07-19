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
export default function ZipCodeGrab(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //tracks errors if incorrect zipcode format is entered
  const types = { buyer: "buyer", seller: "seller" };
  //store userid in state

  const setUser = (type) => {
    dispatch(saveUserType({ userType: type }));
    Cookies.set("userType", type);
  };

  return (
    <div>
      <Paper elevation={5} sx={{ p: 2 }} className={classes.paper}>
        <h1>Are you a buyer or a seller?</h1>
        <Stack spacing={2}>
          <Button
            color="primary"
            variant="contained"
            value="buyer"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setUser(types.buyer);
            }}
          >
            Buyer
          </Button>

          <Button
            color="secondary"
            variant="contained"
            type="submit"
            value="seller"
            onClick={(e) => {
              e.preventDefault();
              setUser(types.seller);
            }}
          >
            Seller
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
