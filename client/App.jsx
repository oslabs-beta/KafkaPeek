import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Health_Dashboard from './containers/Health_Dashboard';
import Landing from './containers/Landing';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import Perf_Dashboard from './containers/Perf_Dashboard';

const URL_PARAMS = new URLSearchParams(window.location.search);
const accessToken = URL_PARAMS.get('token');
const App = () => {
  // const navigate = useNavigate();
  const [active, setActive] = useState('charts');
  const [user, setUser] = useState({
    name: '',
    id: '',
    login: '',
    email: '',
  });

  useEffect(() => {
    console.log('ACCESS TOKEN', accessToken);
    console.log(window.location)
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
      console.log('hi', userObj, user)
      await setUser(userObj);    
      console.log('hi again',user)
    };

    if (accessToken) {
      getGithubUser(accessToken);
    }
    console.log(user, '<---- logging new State hopefully');
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
