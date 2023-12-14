import React from 'react'
import './dashboardTopHeader.css'
import Logo from './logo_png.png'
const dashboardTopHeader = () => {
  return (
    <div>

{/* <!-- Header --> */}

<div class="dashboard-header">

    <div class="dashboard-icon">
        <i class="fa-solid fa-bars"></i>
    </div>

    <div class="dashboard-logo">
        <img src={Logo} alt="" />
    </div>

    <div class="time">

        <h3>12:50:21AM</h3>
        <br />
        <h4>(Asia/Pakistan)</h4>

    </div>

    <div class="dashboard-notification">
        <i class="fa-regular fa-bell"></i>
    </div>
    
    <div class="dashboard-pfp">

    </div>
</div>

    <div className='CurrentFarm'>
        <h1 className='cf'>Current Farm</h1>
        <h2 className='cfN'>The Country Side</h2>
    </div>
    

    </div>
  )
}

export default dashboardTopHeader