import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Landing from './containers/Landing';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <div id='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
