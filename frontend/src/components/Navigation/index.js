import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import SpotFormModal from '../SpotFormModal'
import Logo from '../../images/skull-logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showSpotFormModal, setShowSpotFormModal] = useState(false);

  return (
    <nav className='nav'>
      <div className='nav-left'>
        <Link to="/">
          <i className="fa-solid fa-skull fa-2xl"></i>
          <span className='site-name'>AirBorNot2B</span>
        </Link>
      </div>
      <div className='nav-right'>
        {sessionUser && (<OpenModalButton
        buttonText="Host thy home"
        modalComponent={<SpotFormModal />}
        />
        )}
        {isLoaded && (
          <div className='profile-button'>
            <ProfileButton user={sessionUser} />
          </div> 
        )}
      </div>
    </nav>
  )
  return (
    <nav className='nav'>
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </nav>
  );
}

export default Navigation;