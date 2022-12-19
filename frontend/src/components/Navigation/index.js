// Navigation/index.js

import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import SpotFormModal from "../SpotFormModal";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import Logo from "../../images/logo.png";

import "./Navigation.css"

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="nav">
            <div className="nav-left">
                <Link to="/">
                    <img className="site-logo" alt="logo" src={Logo} />
                </Link>
            </div>
            <div className="nav-right">
                <div className="create-spot-div">
                    {sessionUser ? (
                        <OpenModalButton
                        className="create-spot-button"
                        buttonText="Host thy Home"
                        modalComponent={<SpotFormModal />}
                        />
                    ) : (
                        <OpenModalButton
                        className="create-spot-button"
                        buttonText="Host thy Home"
                        modalComponent={<LoginFormModal />}
                        />
                    )}
                </div>
                <div className="profile-button-div">
                    <ProfileButton className="profile-button" user={sessionUser}/>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;