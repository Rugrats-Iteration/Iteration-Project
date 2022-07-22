import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cooking from "../assets/cooking.jpg";
import { Outlet } from "react-router-dom";
import ZipCodeGrab from "./ZipCodeGrab";
import MenuComponent from "./MenuComponent";
import FloatingCart from "./FloatingCart";
import FeedCardsContainer from "./FeedCardsContainer";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { saveUser } from "../Redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import fetcher from "../lib/fetcher.js";
import { setCart } from "../Redux/cartSlice.js";

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
}));

export default function Body(props) {
  const fakeResponse = {
    kitchenName: "Greg's Kitchen",
    dishes: {
      2: {
        name: "KFC",
        description: "finger licking good",
        price: 15,
        quantity: 30,
      },
      3: {
        name: "Sushi",
        description: "good stuff",
        price: 35,
        quantity: 100,
      },
    },
  };

  const classes = useStyles();
  const currentLocation = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state);

  const [floatCart, setfloatCart] = useState({ price: 0, dishes: {} });
  const dispatch = useDispatch();

  const [feedActive, setFeedActive] = useState(true);
  const [kitchens, setKitchens] = useState({});

  useEffect(() => {
    const getFeed = async () => {
      const feedList = await fetcher("feed");
      console.log(feedList);
      feedList && setKitchens(feedList);
      dispatch(saveUser());
    };
    getFeed();
  }, []);

  console.log(window.location.origin);

  if (isAuthenticated && (!user || !user.zip)) {
    return (
      <div className={classes.body}>
        <ZipCodeGrab />
        <Outlet />
      </div>
    );
  }

  // if zip code good and fetch complete, some part of the feed will render
  if (feedActive) {
    if (currentLocation.pathname.split("/")[2]) {
      console.log(
        "woah, you shouldnt be here --------------------------------"
      );
      return <Navigate to="/feed" replace={true} />;
    }
  }

  // if zip code good and fetch complete, some part of the feed will render
  if (feedActive) {
    if (currentLocation.pathname.split("/")[2]) {
      console.log(
        "woah, you shouldnt be here --------------------------------"
      );
      return <Navigate to="/feed" replace={true} />;
    }
    console.log("FEED IS ACTIVE -----");
    return (
      <FeedCardsContainer
        setFeedActive={setFeedActive}
        kitchensFromFeed={kitchens}
        setCart={setCart}
        cart={cart}
        dispatch={dispatch}
      />
    );
  }
  // else {
  //   return (
  //     //Display purposes only
  //     <div className={classes.body}>
  //       <MenuComponent
  //         // ---------------------------------- this is necessary to pass functions to menucomponent, believe it or not
  //         setfloatCart={setfloatCart}
  //         floatCart={floatCart}
  //       />
  //       <FloatingCart floatCart={floatCart} />
  //       <FloatingCart floatCart={floatCart} />
  //       <Outlet />
  //     </div>
  //   );
  // }
}
