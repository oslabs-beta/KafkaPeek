import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Landing from './containers/Landing';
import Notifications from './containers/Notifications';
import PerfDashboard from './containers/PerfDashboard';
import HealthDashboard from './containers/HealthDashboard';

// allows us to search inside url params
const URL_PARAMS = new URLSearchParams(window.location.search);
const accessToken = URL_PARAMS.get('token');

function App() {
  // gate used to display ongoingmetrics component if metrics are being tracked
  const [ongoingGate, setongoingGate] = useState(false);

  // stores total components of ongoing notifications
  const [ongoingList, setongoingList] = useState([]);
  const [active, setActive] = useState('health');
  const [user, setUser] = useState({
    name: '',
    id: '',
    login: '',
    email: '',
  });

  // triggers when app renders with a token key in params
  useEffect(() => {
    const getGithubUser = async (access_token) => {
      const res = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `bearer ${access_token}`,
        },
      });
      const userObj = {
        name: res.data.name,
        id: res.data.id,
        login: res.data.login,
        email: res.data.emil,
      };
      setUser(userObj);
    };
    if (accessToken) {
      getGithubUser(accessToken);
    }
  }, [accessToken]);

  return (
    <div id="app-container">
      <Routes>
        <Route
          path="/h_dashboard"
          element={
            <HealthDashboard active={active} setActive={setActive} user={user} />
          }
        />
        <Route
          path="/p_dashboard"
          element={
            <PerfDashboard active={active} setActive={setActive} user={user} />
          }
        />
        <Route
          path="/notifications"
          element={<Notifications ongoingList={ongoingList} setongoingList={setongoingList} ongoingGate={ongoingGate} setongoingGate={setongoingGate} active={active} setActive={setActive} user={user} />}
        />
        <Route
          exact
          path="/"
          element={
            <Landing active={active} setActive={setActive} user={user} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
