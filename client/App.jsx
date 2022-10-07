import React, { useState } from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Health_Dashboard from './containers/Health_Dashboard';
import Landing from './containers/Landing';
import Header from './containers/Header';
import Perf_Dashboard from './containers/Perf_Dashboard';

const App = () => {
  const [active, setActive] = useState('charts');
  return (
    <div id='app-container'>
      <Routes>
          <Route path='/h_dashboard' element={<Health_Dashboard active={active} setActive={setActive}/>} />
          <Route path='/p_dashboard' element={<Perf_Dashboard active={active} setActive={setActive}/>} />
          <Route path='/login' element={<Login active={active} setActive={setActive}/>} />
          <Route path='/signup' element={<Signup active={active} setActive={setActive}/>} />
          <Route exact path='/' element={<Landing active={active} setActive={setActive}/>} />
       </Routes>
    </div>
  );
};

export default App;
