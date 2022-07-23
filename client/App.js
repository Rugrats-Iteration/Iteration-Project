import "./style.css";
import Auth from "./components/Auth.js";
import Body from "./components/Body";
import Feed from "./components/Feed";
import KitchenEdit from "./components/KitchenEdit";
import MenuComponent from "./components/MenuComponent.js";
import Nav from "./components/Nav";
import React from "react";

<<<<<<< HEAD
import { useSelector } from "react-redux";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ErrorBoundary } from "./components/ErrorBoundary.js";
import { Routes, Route, Navigate } from "react-router-dom";
=======

// // import './stylesheets/styles.scss';

import { Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> imma/menuController

const useStyles = makeStyles((theme) => ({
  webmain: {
    backgroundColor: "#686de0",
    color: "black",
  },
}));

// create App
const App = () => {
  const classes = useStyles();
<<<<<<< HEAD
  const { isAuthenticated } = useSelector((state) => state.user);
  const backgroundClass = `${classes.webmain} background`;
=======

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState(0);
  const [userZip, setUserZip] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // read cookies to see if logged in currently
  useEffect(() => {
    // read cookie. where we have cookies, set state
    // userId
    let userIdCookie = document.cookie.split('; ').filter((el) => {
      return el.split('=')[0] === 'id';
    })[0];
    userIdCookie = userIdCookie ? userIdCookie.split('=')[1] : false;
    if (userIdCookie) setUserId(Number(userIdCookie));

    // userType
    let userTypeCookie = document.cookie.split('; ').filter((el) => {
      return el.split('=')[0] === 'userType';
    })[0];
    userTypeCookie = userTypeCookie ? userTypeCookie.split('=')[1] : false;
    if (userTypeCookie) setUserType(userTypeCookie);

    // userZip
    let UserZipCookie = document.cookie.split('; ').filter((el) => {
      return el.split('=')[0] === 'userZip';
    })[0];
    UserZipCookie = UserZipCookie ? UserZipCookie.split('=')[1] : false;
    if (UserZipCookie) setUserZip(Number(UserZipCookie));

    const cookiesArr = [userIdCookie, userTypeCookie, UserZipCookie];
    console.log('entered with ', cookiesArr);
    if (userIdCookie) setIsLoggedIn(true);

    // change state so we rerender
    setLoaded(true);
  }, []);

  const logOut = () => {
    console.log('logging out');
    document.cookie = 'userId =';
    document.cookie = 'userType =';
    document.cookie = 'userZip =';
    document.cookie = 'token =';

    setIsLoggedIn(false);
    setUserType('');
    setUserId('');
    setUserZip(0);
  };

  if (isLoggedIn) {
    return (
      <div className={classes.webmain}>
        <CssBaseline />
        <Routes>
          {/* This route will see we're on "/" and auto-redirect to /feed. "/" isn't possible while logged in */}

          <Route
            path='/'
            exact
            element={<Navigate to='/feed' replace={true} />}
          />
          {/* Nav bar */}
          <Route path='/' element={<Nav logOut={logOut} userType={userType} />}>
            {/* buyer feed */}
            <Route
              path='/feed'
              element={<Feed userZip={userZip} userId={userId} />}
            >
              <Route path='/feed/:sellerId' />{' '}
              {/* don't need an element here */}
            </Route>
            <Route
              path='/MyKitchen'
              element={<KitchenEdit userType={userType} userId={userId} />}
            />
            <Route path='/feed/:id' element={<SignUp />} />
          </Route>
          <Route path='/*' element={<Navigate to='/' replace={true} />} />
        </Routes>
      </div>
    );
  }

>>>>>>> imma/menuController
  return (
    <Auth>
      <ErrorBoundary>
        <div className={backgroundClass}>
          <CssBaseline />
          <Nav />
          <Routes>
            {/* BODY w/ login/signup */}
            <Route path="/" element={<Body />} />

            <Route path="/feed" element={<Feed />} />

            {/* FEED with sellerID */}
            <Route path="/feed/:sellerId" element={<MenuComponent />} />

            <Route path="/MyKitchen" element={<KitchenEdit />} />

            {/* Catch-all */}
            <Route
              path="/*"
              element={
                <Navigate to={isAuthenticated ? "/feed" : "/"} replace />
              }
            />
          </Routes>
        </div>
      </ErrorBoundary>
    </Auth>
  );
};
// export App
export default App;
