import React from 'react'
import HeroImg from './tractor_no_bg.png'
import './Hero.css'
import {Link} from 'react-router-dom'

const hero = () => {
  return (
    <div>

{/* <!-- Hero Section --> */}
<div class="hero">
    {/* <!-- Left Text --> */}
    <div class="leftSideHero">
        <div class="mainText">
            <h1>EMPOWER</h1>
            <h2>YOUR FARM WITH</h2>
            <h1 id="agro_text">AGRO DIGITAL</h1>
        </div>
        <div class="captionText">
            <h3>Pakistan's 1st All in One  Agricultural Land <br/> 
            Management System by Ryan, Imama and Arsalan </h3>
        </div>
        <div class="GetStartedButton">
            <button><Link to='/Login'> Get Started </Link><i class="fa-solid fa-circle-right"></i></button>
        </div>
    </div>

    <div class="rightSideHero">
        <img src={HeroImg} alt="" />
    </div>

</div>

    </div>
  )
}

export default hero
