import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Farm from "./Pages/Farm";
import Search from "./Pages/Search";
import Navbar from "./Components/Navbar"
import Market from "./Pages/Market";
import Login from "./Pages/login/login"
import Forum from "./Pages/Forum";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

import Map from "./Pages/Map";
import Test from "./Pages/testingdialogue";
function App() {
  return (
    <body className="flex w-full">
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path ="/"></Route>

        <Route element={<Market/>} path ="/market"></Route>
        <Route element={<Farm />} path="/farm/:farmId" />
        <Route element={<Search />} path="/search" />
        <Route element={<Forum />} path="/forum" />
        <Route element={<Home />} path="/home"></Route>
        <Route element={<Map/>} path="/map"></Route>
      </Routes>
    </BrowserRouter>
    </body>
  );
}

export default App;
