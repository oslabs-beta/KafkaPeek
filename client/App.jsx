import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import Landing from './containers/Landing';
import Header from './containers/Header';

const App = () => {
  return (
    <div id='app-container'>
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Landing />} />
       </Routes>
    </div>
  );
};

export default App;
