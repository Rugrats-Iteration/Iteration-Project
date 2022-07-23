import axios from 'axios';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Stack } from '@mui/material';
import MenuItem from './MenuItem';
import { PropaneSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    top: '0',
    margin: '10% 0',
    width: '300px',
    height: '85%',
    right: '0',
    padding: '10px',
    zIndex: '-1px',
    marginTop: '120px',
    marginRight: '30px',
  },
}));

export default function (props) {
  const classes = useStyles();

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart)
  console.log('dishes', cart.dishes)
  
  const checkout = () => {
    axios
      .post('/api/checkout', {
        dishes: cart.dishes,
      },
       {
        headers: 
        {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        window.location.assign(res.data.url);
        //navigate(res.data.url);
        // console.log(res);
      });
  };

  return (
    <div>
      <Paper className={classes.footer}>
        <Stack>
          <h1>${cart.price}</h1>
          <h3> {Object.keys(cart.dishes).length===0 ? 
          (<p> Cart is currently empty</p>) : 

          (Object.keys(cart.dishes).map(e => <p>{cart.dishes[e].name} x {cart.dishes[e].quantity}</p>))}
           </h3>

          <Button color='primary' onClick={checkout}>
            Checkout
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
