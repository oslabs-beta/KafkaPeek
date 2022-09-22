import React from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Landing from './containers/Landing';
import Main from './containers/Main';

const App = () => {
  return (
    <div id='app-container'>
      <BrowserRouter>
        <Main />
        <Routes>
          <Route path='/dashboard' element={<Dashboard active={true} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
