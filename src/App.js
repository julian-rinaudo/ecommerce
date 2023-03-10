import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import "./App.css";
import Body from "./components/Home/Body_Home/Body";
import Shopping from "./components/Shopping/Shopping";

function App() {
  return (
<>
<Navbar />
    <Routes>
      <Route path="/" element={<Body/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="shopping" element={<Shopping/>}/>
    </Routes>
</>
  );
}

export default App;
