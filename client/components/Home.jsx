import React from 'react';
import Header from '../containers/Header'; 
import Sidebar from '../containers/Sidebar';

const Home = () => {
  return (
    <div id="home-container">
      <Header />
      <Sidebar />
      <div id="home-main">
      This is the home container!
      </div>
    </div>
  );
}
 
export default Home;
