import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  }

  return (
    <div className="login-form-wrapper">
      <div className="login-form-header">
        <button className="close-out-button" onClick={closeModal}>
          <i className="fa-solid fa-x"></i>
        </button>
        <p>Sign Up</p>
      </div>
      <div className="login-form-fields">
        <form className="login-form" onSubmit={handleSubmit}>
          <ul className="errors-list">
            {errors.map((error, idx) => (
              <li className="error-item" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <label>
          <input
            className="form-field-1"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-field-2"
          />
        </label>
        <button className="submit-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}


export default SignupFormModal;