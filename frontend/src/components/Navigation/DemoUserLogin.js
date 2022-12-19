import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import './Navigation.css'

const DemoUserLogin = () => {
    const dispatch = useDispatch();
    const credential = 'Demo-lition';
    const password = 'password';

    return (
        <button 
        className="demo-user-login"
        onClick={() => dispatch(login({credential: credential, password: password}))}
        >Demo User Login</button>
    )
}

export default DemoUserLogin;