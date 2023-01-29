import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/";
import SpotShow from "./components/Spots/SpotShow";
import UserProfile from "./components/Users/UserProfile";

import * as sessionActions from "./store/session"
import { getAllUsers } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const users = useSelector(state => state.users) || [];
  let notCurrentUsers = [];
  const [isLoaded, setIsLoaded] = useState(false);

  if (Object.values(users).length !== 0 && sessionUser) {
    Object.values(users).forEach(user => {
      if (user.id !== sessionUser.id) {
        notCurrentUsers.push(user);
      }
    })

  }

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    dispatch(getAllUsers())
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
      {notCurrentUsers.map(user => (
        <Route key={user.id} exact path={`/@${user.username}`} component={UserProfile} />
      ))}
    </Switch>
    )}
    </>
  );
}

export default App;
