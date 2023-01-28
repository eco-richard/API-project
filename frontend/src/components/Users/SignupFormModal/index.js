import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as sessionActions from "../../../store/session"
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

    // Frontend Validations
    const validationErrors = [];
    if (!isEmail(email)) {
      validationErrors.push("Email must be a valid email.");
    }

    if (username.length < 4 || username.length > 30) {
      validationErrors.push("Username must be between 4 and 30 characters.")
    }

    if (firstName.length < 3) {
      validationErrors.push("First name is too short.")
    }

    if (lastName.length < 3) {
      validationErrors.push("Last name is too short.")
    }

    if (password.length < 5) {
      validationErrors.push("Password must be at least 5 characters.")
    }

    if (password !== confirmPassword) {
      validationErrors.push("Confirm Password field must be the same as the Password field")
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    }

    if (password === confirmPassword && validationErrors.length === 0) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors));
          }
        });
    }
    return setErrors(validationErrors);
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
            type="email"
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

function isEmail(email) {
  if (email.indexOf('@') === -1) {
    return false;
  }
  if (email.indexOf('.') === -1) {
    return false;
  }
  return true;
}