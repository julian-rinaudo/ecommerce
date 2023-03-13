import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Details from "./commons/IndividualView";
import "./App.css";
import Body from "./components/Home/Body_Home/Body";
import Shopping from "./components/Shopping/Shopping";

function App() {
  const [user, setUser] = useState({});
  return (

    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/product/:style" element={<Details />} />
           <Route path="/shopping" element={<Shopping/>}/>
      </Routes>
    </>

  );
}

export default App;
