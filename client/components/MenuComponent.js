import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";
import { useParams } from "react-router-dom";
import Mappy from "./mappy";
import moment from "moment";
import Cooking from "../assets/cooking.jpg";
import FloatingCart from "./FloatingCart";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../Redux/cartSlice.js";

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
  papermain: {
    width: "50%",
    padding: "10px 0px 0px 10px",
    margin: "10px 0px 20px 10px",
  },
  stack: {
    padding: "0px 10px",
  },
  paperbody: {
    width: "650px",
    width: "50%",
    backgroundColor: "#ecf0f1",
    margin: "10px",
  },
  nestedBody: {
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
}));

const dateFormat = (time) => {
  return moment(time, "hhmm").format("LT");
};

const destructure = (object, cart, setCart, dispatch) => {
  const menuUnit = [];
  for (const key in object) {
    const element = object[key];
    console.log(object);
    menuUnit.push(
      <MenuItem
        key={key}
        dishId={key}
        name={element.name}
        description={element.description}
        price={element.price}
        quantity={element.quantity}
        setCart={setCart}
        cart={cart}
        dispatch={dispatch}
      />
    );
  }
  return menuUnit;
};
export default function MenuComponent(props) {
  console.log("sup im the menu component");
  const classes = useStyles();
  const [restaurantName, setRestaurantName] = useState("");
  const [dishes, setDishes] = useState({});
  const [street, setStreet] = useState("");
  const [pickupStart, setPickupStart] = useState("");
  const [pickupEnd, setPickupEnd] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [kitchenData, setkitchenData] = useState(null);
  const [mapStats, setMapStats] = useState({});
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state);

  const dispatch = useDispatch();
  // this line "receives" the useNavigate from elsewhere. it gives us access to props we want to pass
  // const { state } = useLocation();
  // console.log(state);

  // this line allows us to access the ID parameter we passed when routing to this component
  const { sellerId } = useParams();

  console.log("Seller ID:", sellerId);
  useEffect(() => {
    // so now we fetch!

    const getKitchen = async () => {
      await axios.post("/api/db/getmenu", { sellerId }).then((res) => {
        setDishes(res.data.dishes);
        setRestaurantName(res.data.kitchenName);
        setStreet(res.data.address.seller_street_name);
        setStreet(res.data.address.seller_street_name);
        setPickupStart(res.data.pickup_window_start); // pickup_window_start
        setPickupEnd(res.data.pickup_window_end);
        setIsLoaded(true);
        return res.data;
      });
    };

    getKitchen().catch(console.error);
  }, []);

  if (!isLoaded) return <div></div>;

  console.log(restaurantName, dishes, street, "uhmmmmm");

  return (
    <div className={classes.body}>
      <Paper className={classes.paperbody}>
        <Stack className={classes.papermain}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              width: "100%",
              alignItems: "center",
            }}
          >
            <h1>{restaurantName}</h1>
            <span style={{ height: "250px", width: "600px" }}>
              <Mappy
                sellerAddr={street}
                buyerAddr={String(user.zip)}
                setMapStats={setMapStats}
              />
            </span>
            <span style={{ fontSize: "16px", paddingTop: "5px" }}>
              {mapStats.duration
                ? `Trip Duration ⏲: ${mapStats.duration.text} | Trip Distance 🚗: ${mapStats.distance.text}`
                : ""}
            </span>
            <h3>{`Pickup Window: ${dateFormat(pickupStart)} - ${dateFormat(
              pickupEnd
            )}`}</h3>
          </div>
          {/* <span>{street}</span> */}
        </Stack>
        <Stack>
          {/* <div>{destructure(dishes, props)}</div> */}
          {/* <h1>I'm the MenuComponent</h1> */}
          <h2>{restaurantName}</h2>
          <span>{street}</span>
          <span>{`${dateFormat(pickupStart)} - ${dateFormat(pickupEnd)}`}</span>
        </Stack>
        {destructure(dishes, cart, setCart, dispatch)}
        <FloatingCart cart={cart} />
      </Paper>
    </div>
  );
}
