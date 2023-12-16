import { useState } from 'react'
import './App.css'
import Home from './Pages/Home';
import Farm from './Pages/Farm';
import Search from './Pages/Search';
import CarouselComponent from './Pages/Home';
import Forum from './Pages/forum';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={Navbar} />
    //   </Routes>
    // </Router>
    // <Farm/>
    // <Home/>
    <Forum/>

  )
}

export default App
