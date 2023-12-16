import { useState } from 'react'
import './App.css'
import Farm from './Pages/Farm';
import Search from './Pages/Search';
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
    <Farm/>
  )
}

export default App
