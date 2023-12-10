
import React from 'react'
import './Dashboard.css'
import {Link} from 'react-router-dom'
import DashboardTopHeader from '../../dashboardTopHeader/dashboardTopHeader'
import DashboardSideBar from '../../dashboardSideBar/dashboardSideBar'
import WeatherImg from './weather_img.png'
import { Doughnut } from 'react-chartjs-2';
import "chart.js/auto";
import {Bar} from 'react-chartjs-2' ;
import {Line} from 'react-chartjs-2';
import { useEffect } from 'react';
import Logo from './logo_png.png';
import axios from 'axios'


function Example() {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  loadUserData(); 
}

function loadUserData()
{
    const email = localStorage.getItem("email"); 
    console.log(email); 

    axios.post('http://10.101.102.54:5000/server/getUserData',{
       //// email: email ;  


    }).then((response)=>{

        console.log(response); 


      });

}

const LineOpt ={
    plugins: {
      legend: {
        display: false
      }
    }
  };

const LineDat = 
{
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
    //   label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
}; 

const prodData = 
{
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
       
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

const prodOpt = 
{
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            },
            grid :
            {
                display : false
            }
        }],
        xAxes : [

            {
                gridLines :
                {
                    display : false 
            
                } 
            }

        ]
    }
};

const cropData =  {
        labels: [ "Maize", "Wheat"],
        datasets: [{
          data: [20, 30, 10],
          backgroundColor: [" #fed401", "rgb(72, 176, 102)", "#faf5f5"],
          borderWidth: 3
        }]
      } ; 

const cropOptions = 
{
    
        cutoutPercentage: 90
      
}      ;


const dashboard = () => {
  return (
    
    <div className='dashboardBody' onLoad={Example()}>
        <DashboardTopHeader />
        <DashboardSideBar/>

        <div class="firstCol">

        <div class="firstCol-Img">
            <img src={WeatherImg} alt=""/>
        </div>

        <div class="firstCol-TodayWeather">
            <h4 class="firstText">Weather's today</h4>
            <div class="firstCol-TodayWeather-DayDate">

                <h4 class="Day">Monday</h4><h4 class="Date">(22th March ,2022)</h4>
            </div>

            <div class="CurrWeather">
                <i class="fa-solid fa-sun"></i>
                <h1>10°C</h1><br/>
                <h3>11.43 hours</h3>
                <h4>(7.19/18.30)</h4>
            </div>
          
            <div class="otherdetailsWeather">
                <i class="fa-solid fa-droplet"> 49%</i>
                <i class="fa-solid fa-wind"> 8m/s</i>
                <i class="fa-solid fa-arrow-down-short-wide"> 1023hPa</i>
            </div>
<hr class="divider"/>
        </div>
        
        <div class="firstCol-WeatherForecast">

            <div class="text1">
                <h3>Weather Forecast</h3>
            </div>

            <div class="text2">
                <h3>24 Hours</h3>
            </div>

            <div class="part2">
                <div class="rightpart">
                    <i class="fa-solid fa-cloud-sun-rain"></i>
                </div>
                <div class="leftpart">
                    <h3>15°C</h3>
                    <h4>2°C</h4><h5>(Night)</h5>

                </div>
            </div>

            <div class="thirdSection">
                <i class="fa-solid fa-droplet"> 49%</i>
                <i class="fa-solid fa-wind"> 8m/s</i>
                <i class="fa-solid fa-arrow-down-short-wide"> 1023hPa</i>
            </div>

        </div>
    </div>


    {/* <!-- Second Column  --> */}
    
    <div class="secondCol">
        <h3>Dashboard</h3>
        <div class="currentTask">
            <h4>Current Tasks</h4>
            <div class="task1">
                <div class="timeleft-1">
                    <h1>2</h1>
                    <br/>
                    <h2>Days</h2>
                </div>

                <div class="description-task1">
                    <h4>Scheduled Spraying
                        was not Performed
                    </h4>
                </div>
            </div>

            <div class="task2">
                <div class="timeleft-2">
                    <h1>3</h1>
                    <br/>
                    <h2>Days</h2>
                </div>

                <div class="description-task2">
                    <h4>Field Fertilizer required
                        in 3 days
                    </h4>
                </div>
            </div>
        </div>
        <h3 class="cropstext">Crops</h3>
        <div class="crops">
            
            <div id="donut-chart-container">
              {/* <canvas id="donut-chart">  */}

                        <Doughnut id='donut-chart'
                         data ={cropData}
                         options = {cropOptions}
                         />
                {/* </canvas>  */}
              </div>

        </div>

         <h6>Harvest</h6>
        <div class="Harvest"> 

            <h1>Wheat</h1>
	<div class="progress-bar-wheat">
		<div class="progress-wheat" >100%</div>
	</div>

    <h2>Maize</h2>
	<div class="progress-bar-maize">
		<div class="progress-maize" >80%</div>
	</div>

    <h3>Onions</h3>
	<div class="progress-bar-onion">
		<div class="progress-onion">60%</div>
	</div>

        </div>

        </div>
   


    // Third Column 

    
    <div class="thirdCol">
        <h1>Production Details</h1>

        <div class="production-details">
            <div class="chart-production">
                <Bar 
                    data ={prodData}
                    options={prodOpt}
                />

            </div>
            </div>


        <h2>Financial Statistics</h2>

        <div class="financial-statistics">
    
            <Line 
            data = {LineDat}
            options = {LineOpt}
            className='financialChart'
            />          
        </div>

    </div>

    

</div>

  )
}

export default dashboard