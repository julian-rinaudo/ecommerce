import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Details from "./commons/IndividualView";
import "./App.css";
import Body from "./components/Home/Body_Home/Body";
import Shopping from "./components/Shopping/Shopping";
import Users from "./components/Users";

function App() {
  // const [user, setUser] = useState({});
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:style" element={<Details />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
