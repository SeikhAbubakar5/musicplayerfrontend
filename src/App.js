
import React from 'react';
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Navbar from "./Components/Navbar/Navbar"
import Allplaylist from "./Components/Dashboard/Allplaylist"
import Createplaylist from './Components/Dashboard/Createplaylist';
import Addsong from './Components/Dashboard/Addsong';
import Getallsong from './Components/Dashboard/Getallsong';
function App() {
  return (
    <div className="App">
      <Navbar/>
      
         <Routes>
              <Route path="/add-song" element={<Addsong/>} />
              <Route path="/all-song" element={<Getallsong/>} />
              <Route path="/create-playlist" element={<Createplaylist/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Routes>
    </div>
  );
}

export default App;
