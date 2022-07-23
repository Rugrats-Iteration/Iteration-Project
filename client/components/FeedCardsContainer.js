import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import { Outlet, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import KitchenCard from './KitchenCards';
import moment from 'moment';

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    backgroundColor: 'transparent',
    padding: '0px 20px',
  },
  heavyFont: {
    color: 'white',
    fontWeight: '900',
    fontSize: '40px',
    fontFamily: 'Nunito',
  },
  feedItem: {
    marginTop: '15px',
    width: '100%',
    padding: '5px',
    maxWidth: '800px',
    backgroundColor: '#FA8072',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

export default function FeedContainer(props) {
  const classes = useStyles();
  const ZipCode = props.userZip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  // const [kitchens, setKitchens] = useState({});

  //updating time format

  const dateFormat = (time) => {
    return moment(time, 'hhmm').format('LT');
  };

  // state is updated everytime fetch is getting new stuffs
  // useEffect(() => {
  //   setKitchens(props.kitchensFromFeed);
  // }, [props.kitchensFromFeed]);
  // console.log(props);
  // define state

  // for x in props passed from feed, add component to kitchens array
  const kitchensArr = [];
  console.log(props.kitchensFromFeed);
  // console.log(props.kitchensFromFeed);

  props.kitchensFromFeed.forEach((kitchenObj, idx) => {
    console.log('iterating through kitchen object')
    const curKitchen = kitchenObj
    console.log('current kicthen =>', curKitchen);
    // console.log(props.setfloatCart);
    if (curKitchen.market_enabled) {
      kitchensArr.push(
        <KitchenCard
          key={curKitchen._id}
          kitchenID={curKitchen._id}
          kitchenName={curKitchen.kitchen_name}
          //COMMENT THE FOLLOWING OUT IN KITCHEN CARD COMPONENT AS WELL
          // timeStart={dateFormat(curKitchen.pickup_window_start)}
          // timeEnd={dateFormat(curKitchen.pickup_window_end)}
          bio={curKitchen.bio}
          setFeedActive={props.setFeedActive}
          // setCart={props.setCart}
          // cart={props.cart}
          // dispatch={props.dispatch}
        />
      );
    }
  })
  // for (let kitchenObj in props.kitchensFromFeed) {
  //   console.log(kicthenObj)
    // const curKitchen = kitchenObj[_id];
    // console.log(props.setfloatCart);
    // if (curKitchen.market_enabled) {
    //   kitchensArr.push(
    //     <KitchenCard
    //       key={curKitchen._id}
    //       kitchenID={curKitchen._id}
    //       kitchenName={curKitchen.kitchen_name}
    //       // timeStart={dateFormat(curKitchen.pickup_window_start)}
    //       // timeEnd={dateFormat(curKitchen.pickup_window_end)}
    //       bio={curKitchen.bio}
    //       setFeedActive={props.setFeedActive}
    //       // setfloatCart={props.setfloatCart}
    //       // floatCart={props.floatCart}
    //     />
    //   );
    // }
  // }

  console.log(kitchensArr);
  //Declare variables and state
  //Return back to DOM
  return (
    <div className={classes.body}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <h1> Kitchens Ready For Action! </h1>
      </div>
      <Paper
        elevation={2}
        className={classes.feedItem}
        variant='outlined'
        style={{ maxHeight: '40rem', overflow: 'auto' }}
      >
        {kitchensArr}
      </Paper>
      {/* <Outlet /> */}
    </div>
  );
}
