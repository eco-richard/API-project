import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return (
    <Redirect to="/" />
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
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <div className='login-form-header'>  
        <div className='close-out-button-div'>
          <button className="close-out-button" onClick={closeModal}>
            {(<i className="fa-solid fa-x"></i>)}
          </button>
        </div>
        <div className='login-form-title-wrapper'>
        <div className='login-form-title'>Log In!</div>
        </div>
        </div>
        <div className='errors-list'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        </div>
        <label>
          <input
          className='form-field'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
        </label>
        <label>
          <input
            className='form-field'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        <button type="submit" className='submit-button'>Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;