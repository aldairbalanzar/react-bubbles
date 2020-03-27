import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log('handleSubmit res:', res.data);
        window.localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/protected');
        setCredentials({
          username: '',
          password: ''
        })
      })
      .catch(err => console.log(err));
  }

  console.log(credentials);
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    <input
                     type="text"
                     id="username"
                     name="username"
                     value={credentials.username}
                     onChange={handleChange}
                     placeholder="username"
                     />
                </label>

                <label htmlFor="password">
                    <input
                     type="text"
                     id="password"
                     name="password"
                     value={credentials.password}
                     onChange={handleChange}
                     placeholder="password"
                     />
                </label>

                <button type="submit"> Log in </button>
            </form>
    </>
  );
};

export default Login;
