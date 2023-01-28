import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { Redirect, useHistory, useLocation } from 'react-router-dom';


import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return (
    <Redirect to={location} />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className="login-form-wrapper">
      <div className='login-form-header'>
          <button className="close-out-button" onClick={closeModal}>
            <i className="fa-solid fa-x"></i>
          </button>
          <p>Log In</p>
      </div>
      <div className="login-form-fields">
        <form className="login-form" onSubmit={handleSubmit}>
          <ul className='errors-list'>
            {errors.map((error, idx) => (
              <li className="error-item" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="form-field-1"
          />
          <input        
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-field-2"
          />

          <button className="submit-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginFormModal;