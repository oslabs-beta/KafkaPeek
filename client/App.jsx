import React from 'react';
import { Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Landing from './containers/Landing';
import Login from './components/Login';

const App = () => {
  return (
    <div id="app-container">
      <BrowserRouter>
        <span>This is the App component</span>
        <div>
          <Link to='/home'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/'>Landing</Link>
        </div>

        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route exact path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
