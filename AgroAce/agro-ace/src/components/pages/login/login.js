import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import './Login.css'
import Logo from './logo_png.png'
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom";
// import { response } from 'express';
//import { response } from 'express';

const Login = () => {
    const navigate = useNavigate(); 
    const[username,setUsername] = useState(''); 
    const[password,setPassword] = useState('');
  const[LoginText,setLoginText] = useState(''); 
    function handleLogin()
    {
      axios.post('http://10.101.102.54:5000/server/login',{
        username : username , 
        password :password ,
      }).then((response)=>{

        if(response.data == 'VALID')
        {
          console.log("Login Successful"); 
          document.getElementById("loginStatus").style.display ="block";
          document.getElementById("loginStatus").style.backgroundColor ="rgb(51, 215, 152)";
     
          setLoginText("Login Successful") ; 
        
          // setting the username and other data in local storage to fetch later 
          localStorage.setItem("email",username); 
          // console.log(localStorage.getItem("email")); 

          setTimeout(() => {  navigate("/Dashboard"); }, 1500);
       //   navigate("/Dashboard");
        }else
        {
          document.getElementById("loginStatus").style.display ="block";
          console.log("Login Failed")
          setLoginText("Login Failed") ; 
        }     
      });
        console.log(username);
        console.log(password);

    };

  return (
    <div class='LoginPage'>

{/* <!-- Left Side of the page --> */}
    <div class="leftSection">
        <h3 class="bkMain"><i class="fa-solid fa-arrow-left"></i><a href="landingPage.html"><Link to='/'> Back to Main Screen</Link></a> </h3>
      
        <div class="leftInnerBox">
        <div class="innerBox">
            <h1>"Revolutionize the way you farm with our cutting-edge management system."
            </h1>
            <h3>Join the thousands of farmers who trust our software to manage their agricultural operations. Discover the power of technology to help you grow more efficiently and sustainably.</h3>
        </div>
    </div>
    </div>

    {/* <!-- Right Section of the Page --> */}
    <div class="rightSection">
        <img src={Logo} alt=""/>
        <h1>Welcome Back <i class="fa-solid fa-face-smile"></i></h1>
        {/* <!-- Login Form --> */}
        <div class="loginForm">
            <label for=""><span>Email</span></label><br/>
            <input class="frm" type="text" value={username} onChange={e => setUsername(e.target.value)}/><br/>
            <label for="" ><span>Password</span></label><br/>
            <input type="password" class="frm" name="" id="" value={password} onChange={e => setPassword(e.target.value)}/>
            <br/>
         <div class="loginthird">   <input type="radio" id="html" name="fav_language" value="HTML"/>
            <label for="html">Farmer</label>
            <input type="radio" id="css" name="fav_language" value="CSS" />
            <label for="css">Government</label>
   </div>
         
         <div class="loginsec">
            <br/>  <input type="checkbox" class="rmbrme"/>Remember me
            <a>Forgot Password ?</a>
            <br/>
         </div>
         
        <button onClick={handleLogin}><a><Link to=" "  >Login</Link></a></button>
        </div>
        <div class="loginStatus" id="loginStatus">
          <h1>{LoginText}</h1>
        </div>
    </div>
    </div>
  )
}

export default Login