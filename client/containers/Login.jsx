import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Login = () => {
  return (
    <div id="login-container">
      <Header />
      <div id='login-main'>
        <div id='login-inputs'>
          <input type="text" placeholder='Enter your username here...'></input>
          <input type="password" placeholder='Enter your password here...'></input>
          <button type='submit'>Log In</button>
          <Link to='/forgot'>Forgot your username or password?</Link>
          <Link to='/signup'>Don't have an account? Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
