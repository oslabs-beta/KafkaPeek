import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import Landing from './containers/Landing';

const URL_PARAMS = new URLSearchParams(window.location.search);

const App = () => {
  const [active, setActive] = useState('charts');
  const [user, setUser] = useState({
    name: '',
    id: '',
    username: '',
    email: '',
  });

  let userObject = {
    name: '',
    id: '',
    username: '',
    email: '',
  };

  useEffect(() => {
    userObject.name = URL_PARAMS.get('name');
    userObject.id = URL_PARAMS.get('id');
    userObject.username = URL_PARAMS.get('username');
    userObject.email = URL_PARAMS.get('email');
    setUser(userObject);
    console.log(userObject);
  }, [URL_PARAMS]);

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
