import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import Logo from './logo_png.png'

const login = () => {
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
            <input class="frm" type="text"/><br/>
            <label for="" ><span>Password</span></label><br/>
            <input type="password" class="frm" name="" id=""/>
            <br/>
         <div class="loginthird">   <input type="radio" id="html" name="fav_language" value="HTML"/>
            <label for="html">Farmer</label>
            <input type="radio" id="css" name="fav_language" value="CSS"/>
            <label for="css">Government</label>
   </div>
         
         <div class="loginsec">
            <br/>  <input type="checkbox" class="rmbrme"/>Remember me
            <a>Forgot Password ?</a>
            <br/>
         </div>
         
        <button><a>Login</a></button>
        </div>


    </div>
    </div>
  )
}

export default login