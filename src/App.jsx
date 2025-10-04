import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Bot from "./Components/Bot/Bot";
import Appointment from "./Components/My_Task/Appointment";
import Profile from "./Components/Profile/Profile";
import Loading from "./Components/Loading/Loading";
import Client from "./Components/Client/Client";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bot" element={<Bot />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/client" element={<Client/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
