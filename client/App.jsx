import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './containers/Signup';
import Health_Dashboard from './containers/Health_Dashboard';
import Landing from './containers/Landing';
import Notifications from './containers/Notifications';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import Perf_Dashboard from './containers/Perf_Dashboard';


const URL_PARAMS = new URLSearchParams(window.location.search);
const accessToken = URL_PARAMS.get('token');
const App = () => {
  const [active, setActive] = useState('charts');
  const [user, setUser] = useState({
    name: '',
    id: '',
    login: '',
    email: '',
  });

  useEffect(() => {
    const getGithubUser = async (access_token) => {
      const res = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `bearer ${access_token}`,
        },
      });
      
      const userObj = await {
        name: res.data.name,
        id: res.data.id, 
        login: res.data.login,
        email: res.data.emil
      };
      await setUser(userObj);    
    };
    if (accessToken) {
      getGithubUser(accessToken);
    }
  }, [accessToken]);

  return (
    <div id='app-container'>
      <Routes>
        <Route
          path='/h_dashboard'
          element={
            <Health_Dashboard active={active} setActive={setActive} user={user}/>
          }
        />
        <Route
          path='/p_dashboard'
          element={
            <Perf_Dashboard active={active} setActive={setActive} user={user}/>
          }
        />
        <Route
          path='/notifications'
          element={<Notifications active={active} setActive={setActive} user={user} />}
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
