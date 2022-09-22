import React from 'react';

const Main = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div id='main-container'>
      <Header />
      <Sidebar setActive={setActive}/> 
      {active == "dashboard" && <Dashboard />}
      {active == "profile" && <Dashboard />}
      {active == "dashboard" && <Dashboard />}
    </div>
  );
}

export default Main;
