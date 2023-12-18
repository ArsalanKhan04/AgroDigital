import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Login.css';
import Logo from './logo_png.png';
import client from '../../axiosconfig';
import { useNavigate } from "react-router-dom";
// import { response } from 'express';
//import { response } from 'express';


const Login = () => {
    const [currentUser, setCurrentUser] = useState();
    const [LoginText, setLoginText] = useState('');
    const[email, setEmail] = useState('');
    const[username,setUsername] = useState(''); 
    const[password,setPassword] = useState('');
    const[registrationToggle, setRegistrationToggle] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
      client.get("users/user").then(function(res){
        setCurrentUser(true)
      })
      .catch(function(error){
        setCurrentUser(false)
      })
    }, []);

    function update_form_btn() {
      if(registrationToggle){
        document.getElementById("form_btn").innerHTML = "Sign Up Instead";
        setRegistrationToggle(false);
      } else {
        document.getElementById("form_btn").innerHTML = "Already have an account?";
        setRegistrationToggle(true);
      }
    }


    function handleLogin(e)
    {
      e.preventDefault();
      client.post(
        "/users/login",
        {
          email:email,
          password:password
        }
      ).then(function(res){
        setCurrentUser(true);
      })
      .catch(error => {
        // Error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setLoginText(`Error: ${error.response.status} - ${error.response.data.error}`);
        } else if (error.request) {
          // The request was made but no response was received
          setLoginText('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoginText('Error setting up the request');
        }
      });
      console.log(username);
      console.log(password);

    };
    function handleSignup(e){

      e.preventDefault();
      client.post(
        "/users/register",
        {
          email:email,
          username:username,
          password:password
        }
      ).then(function(res){
        client.post(
          "/login",
          {
            email:email,
            password:password
          }
        ).then(function(res){
          setCurrentUser(true);
        })
      }).catch(error => {
        // Error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setLoginText(`Error: ${error.response.status} - ${error.response.data.error}`);
        } else if (error.request) {
          // The request was made but no response was received
          setLoginText('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          setLoginText('Error setting up the request');
        }
      });
    };

    if (currentUser){
      navigate("/home")
    }


  return (
    <div class='LoginPage'>

{/* <!-- Left Side of the page --> */}
    <div class="leftSection">
        <h3 class="bkMain"><i class="fa-solid fa-arrow-left"></i><Link to='/'> Back to Main Screen</Link></h3>
      
        <div class="leftInnerBox">
        <div class="innerBox">
            <h1>"Revolutionize the way you farm with our cutting-edge management system."
            </h1>
            <h3>Join the thousands of farmers who trust our software to manage their agricultural operations. Discover the power of technology to help you grow more efficiently and sustainably.</h3>


            <button onClick={update_form_btn} id = "form_btn">Sign Up Instead</button>
        
        </div>
    </div>
    </div>

    {/* <!-- Right Section of the Page --> */}

    {

        

      registrationToggle ? (
        <div class="rightSection">
          <img src={Logo} alt=""/>
          <h1>Sign up Now! <i class="fa-solid fa-face-smile"></i></h1>
          {/* <!-- Signup Form Form --> */}
          <div class="loginForm">
            <form onSubmit={handleSignup}>
              <label for=""><span>Username</span></label><br/>
              <input class="frm" type="text" value={username} onChange={e => setUsername(e.target.value)}/><br/> 
              <label for=""><span>Email</span></label><br/>
              <input class="frm" type="text" value={email} onChange={e => setEmail(e.target.value)}/><br/>
              <label for="" ><span>Password</span></label><br/>
              <input type="password" class="frm" name="" id="" value={password} onChange={e => setPassword(e.target.value)}/>
              <br/>

          <button type="submit">Sign Up</button>
            </form>    
          </div>
          <div class="loginStatus" id="loginStatus">
            <h1>{LoginText}</h1>
          </div>
      </div>
      ) : (
        <div class="rightSection">
          <img src={Logo} alt=""/>
          <h1>Welcome Back <i class="fa-solid fa-face-smile"></i></h1>
          {/* <!-- Login Form --> */}
          <div class="loginForm">
            <form onSubmit={handleLogin}>
              <label for=""><span>Email</span></label><br/>
              <input class="frm" type="text" value={email} onChange={e => setEmail(e.target.value)}/><br/>
              <label for="" ><span>Password</span></label><br/>
              <input type="password" class="frm" name="" id="" value={password} onChange={e => setPassword(e.target.value)}/>
              <br/>
              <button type="submit">Login</button>
            </form>
              
                    
          </div>
          <div class="loginStatus" id="loginStatus">
            <h1>{LoginText}</h1>
          </div>
      </div>
      )
    }


    
    </div>
  )
}

export default Login