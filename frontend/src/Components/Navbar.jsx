import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Logo from './logo_png.png';
import axios from "axios"
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
});






const Navbar = () => {

  const [csrftoken_x, setCSRF] = useState("");
  useEffect(() => {
    axiosInstance.get("users/csrftoken").then(function(res){
      setCSRF(res.data.csrf_token)
    })
    .catch(function(error){
      console.log(error.message)
    })
  }, []);

  const startLogout = () => {
    axiosInstance.post("users/logout", "",
    { withCredentials: true,
      headers: {
        "X-CSRFToken":csrftoken_x
      } })
    .then(function(res){
      navigate("/", {replace:true});
    }
    )
    .catch(function(error){
      console.log(error.message);
    })
  }

  const navigate = useNavigate();
  return (
    <nav>
        <div className="logo">
            <img src={Logo} onClick={() => navigate("/home", { replace: true })} className="w-1/3"></img>
            <h2 onClick={() => navigate("/home", { replace: true })}>AgroDigital</h2>
        </div>
        <div className="links">
            <h5 className="links">Information</h5>
            <h5 className="links" onClick={() => navigate("/market",{replace:true})}>Market</h5>
            <h5 className="links" onClick={() => navigate("/forum",{replace:true})}>Forums Page</h5>
            <h5 className="links" onClick={startLogout}>Log Out</h5>
        
        </div>
    </nav>
  )
}

export default Navbar