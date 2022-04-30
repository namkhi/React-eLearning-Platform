import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './components/registration'
import Confirmation from './components/confirmation'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'
import ModifyAccount from './components/ModifyAccount'
import MainChat from './components/Chat/mainChat'
import Verify from './components/Verify'

class App extends React.Component {
  render() { 
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/confirm" element={<Confirmation />}  />
          <Route exact path="/chat" element={<MainChat />} />
          <Route exact path="/ModifyAccount" element={<ModifyAccount />} />
          <Route exact path="/LoggedIn" element={<LoggedIn />}  />
          <Route exact path="/Verify" element={<Verify />}/>
          <Route exact path="/" element={<Login />}  />
        </Routes>
      </BrowserRouter>
    );
  }
}
 
export default App;