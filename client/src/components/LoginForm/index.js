import React, { useState } from "react";
import { setUserSession } from "../../utils/Session";
import "./style.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

function LoginForm(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();

    // console.log(username.value, password.value);
    setError(null);
    setLoading(true);
    axios.post("/api/users/login", {
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        console.log(res)
        // console.log('logged in successfully');
        history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        console.log('login error: ', error);
          Swal.fire({
              icon: 'error',
              title: '<span>Incorrect username or password.</span>',
              showConfirmButton: false,
              background: '#343a40',
              timer: 1500
            })
      });
      axios.post("/api/users/sessions")
        .then((res) => {
            console.log(res);
            // console.log('session stored successfully');
        })
        .catch((err) => {
            console.log(err)
        })
  };

  return (
    <main>
      <div className="loginFormContainer">
        <form className="loginForm" onSubmit={loginHandler}>
          <div id="loginHeader" className="form-text">
            Please enter your account information
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              {...username}
              className="form-control"
              id="username"
              aria-describedby="usernameEntry"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              {...password}
              className="form-control"
              id="password"
            />
          </div>
          <div className="btnContainer">
            <button type="submit" className="btn customBtn" id="submitBtn">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default LoginForm;
