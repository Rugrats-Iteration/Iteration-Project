import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  menuitem: {
    backgroundColor: '#bdc3c7',
    padding: '10px',
    margin: '10px',
  },
}));
export default function (props) {
  console.log(props);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Paper elevation={5} className={classes.menuitem}>
      <Stack direction='row' justifyContent='space-between'>
        <h3>
          {props.name} - {props.price}
        </h3>
        <h3>Quantity: {props.quantity}</h3>
      </Stack>
      <Stack direction='row' justifyContent='space-between'>
        <p>{props.description}</p>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => { 
            const newDishObj = {
              price: props.price,
              name: props.name,
              dishId: props.dishId
            };
            console.log('newdish', newDishObj)
            dispatch(props.setCart(newDishObj))
            // const qty = props.floatCart.dishes[props.dishId]
            //   ? props.floatCart.dishes[props.dishId].quantity + 1
            //   : 1;
            // const newDishObj = {
            //   price: props.price,
            //   name: props.name,
            //   quantity: qty,
            // };
            // props.setfloatCart({
            //   dishes: {
            //     ...props.floatCart.dishes,
            //     [props.dishId]: newDishObj,
            //   },
            //   price: (
            //     Number(props.floatCart.price) + Number(props.price.slice(1))
            //   ).toFixed(2),
            // });
          }}
        >
          Add to Cart
        </Button>
      </Stack>
    </Paper>
  );
}
