import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import Landing from './containers/Landing';
import axios from 'axios';

const URL_PARAMS = new URLSearchParams(window.location.search);

const App = () => {
  const [active, setActive] = useState('charts');
  const [user, setUser] = useState({
    name: '',
    id: '',
    login: '',
    email: '',
  });

  const accessToken = URL_PARAMS.get('token');

  useEffect(() => {
    console.log('ACCESS TOKEN', accessToken);
    const getGithubUser = async (access_token) => {
      const res = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `bearer ${access_token}`,
        },
      });
      await setUser(res.data);      
    };
    if (accessToken) getGithubUser(accessToken);
    console.log(user, '<---- logging new State hopefully');
  }, [accessToken]);

  return (
    <div id='app-container'>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <Dashboard active={active} setActive={setActive} user={user} />
          }
        />
        <Route
          path='/login'
          element={<Login active={active} setActive={setActive} />}
        />
        <Route
          path='/signup'
          element={<Signup active={active} setActive={setActive} />}
        />
        <Route
          exact
          path='/'
          element={
            <Landing active={active} setActive={setActive} user={user} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
