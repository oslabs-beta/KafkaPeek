import React, { useState } from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import Landing from './containers/Landing';
import Header from './containers/Header';

const App = () => {
  const URL_PARAMS = new URLSearchParams(window.location.search);
  const [active, setActive] = useState('charts');

  const [loggedIn, setLoggedIn] = useState({
    name: '',
    id: '',
    username: '',
    email: ''
  });
  
  useEffect(() => {
    effect
    return () => {
      cleanup
    };
  }, loggedIn);
  
  return (
    <div id='app-container'>
      <Routes>
        <Route path='/dashboard' element={<Dashboard active={active} setActive={setActive} loggedIn={loggedIn} />} />
          <Route path='/login' element={<Login active={active} setActive={setActive}/>} />
          <Route path='/signup' element={<Signup active={active} setActive={setActive}/>} />
          <Route exact path='/' element={<Landing active={active} setActive={setActive}/>} />
       </Routes>
    </div>
  );
};

export default App;
