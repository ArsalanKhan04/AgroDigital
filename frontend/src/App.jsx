import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Farm from "./Pages/Farm";
import Search from "./Pages/Search";
import CarouselComponent from "./Pages/Home";
import Forum from "./Pages/forum";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Farm/>} path="/farm"/>
      <Route element={<Search />} path="/search"/>
      <Route element={<Forum/>} path="/forum"/>
      <Route element={<Home/>} path="/"/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
