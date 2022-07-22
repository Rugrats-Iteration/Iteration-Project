import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  menuitem: {
    backgroundColor: "#bdc3c7",
    padding: "10px",
    margin: "10px",
  },
}));
export default function (props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(props.quantity);
  const { dishes } = useSelector((state) => state.cart);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (Object.keys(dishes).length > 0) {
      if (dishes[props.dishId]) {
        setquantity(props.quantity - dishes[props.dishId].quantity);
      }
    }
  }, [dishes]);

  useEffect(() => {
    quantity === 0 && setDisable(true);
  }, [quantity]);

  return (
    <Paper elevation={5} className={classes.menuitem}>
      <Stack direction="row" justifyContent="space-between">
        <h3>
          {props.name} - {props.price}
        </h3>
        <h3>Quantity: {quantity}</h3>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <p>{props.description}</p>
        <Button
          variant="contained"
          color="secondary"
          disabled={disable}
          onClick={() => {
            const newDishObj = {
              price: props.price,
              name: props.name,
              dishId: props.dishId,
            };
            dispatch(props.setCart(newDishObj));
          }}
        >
          Add to Cart
        </Button>
      </Stack>
    </Paper>
  );
}
