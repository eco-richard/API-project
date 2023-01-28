import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/";
import SpotShow from "./components/Spots/SpotShow";
import UserProfile from "./components/Users/UserProfile";

import * as sessionActions from "./store/session"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
    <hr />
    <Navigation isLoaded={isLoaded} />
    <hr />
    {isLoaded && ( 
    <Switch>
      <Route exact path="/" component={Spots} />
      <Route exact path="/spots/:spotId" component={SpotShow} />
      <Route path="/user" component={UserProfile} />
    </Switch>
    )}
    </>
  );
}

export default App;
