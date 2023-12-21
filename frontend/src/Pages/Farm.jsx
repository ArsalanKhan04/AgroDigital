import React from "react";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Components/Navbar.jsx";

import { useParams } from 'react-router-dom'

import AddCrop from "../Components/AddCrop"
import WeatherApp from "../Components/WeatherApp"
import axios from 'axios';
import Crop1 from "../static/imgs/crop_1.png"
import Crop2 from "../static/imgs/crop_2.png"
import Crop3 from "../static/imgs/crop_3.png"
import Correct from "../static/imgs/correct.png"
import Error from "../static/imgs/error.png"

const allCropsImg = [Crop1, Crop2, Crop3]

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
})

const Farm = () => {
  const { farmId } = useParams();


 

  // Getting the CSRF token for post requests
  const [csrftoken_x, setCSRF] = useState("");
  useEffect(() => {
    axiosInstance.get("users/csrftoken").then(function(res){
      setCSRF(res.data.csrf_token)
    })
    .catch(function(error){
      console.log(error.message)
    })
  }, []);



  const [loading, setLoading] = useState(true)
  const [farm, setFarmData] = useState({})
  useEffect(()=>{
    axiosInstance.get(`farms/geteachfarm?farm_id=${farmId}`)
    .then(function(res){
      setFarmData(res.data)
      console.log("Farm Data has been retrieved")
      console.log(res.data)
    })
    .catch(function(error){
      console.log(error.message)
    })
    .finally(()=>
    {
      setLoading(false)
    }
    )
  }, [farmId])
  
  
  const [farmCrops, setFarmCrops] = useState([]);
  useEffect(() => {
    axiosInstance.get(`farms/getfarmcrops?farms_id=${farmId}`)
    .then(function(res){
      setFarmCrops(res.data);
      console.log("getting this data")
      console.log(res.data);
    })
    .catch(function(error){
      console.log(error.message);
    })
  }, [])




  const [landNutrients, setLandNutrients] = useState(
    {
      nitrogen:0,
      phosphorus:0,
      potassium:0
    }
  );



  
  const [barChart, setBarChart] = useState(null)
  const [cropName, setCropName] = useState("")
  const [barChartLoading, updateBarChartLoading] = useState(false)
  const cropNames = ["Rice", "Wheat", "Sugarcane"]
  const getBarChart = (crop_id) => {
    updateBarChartLoading(true);
    axiosInstance.get(`farms/getcrophistoryimage?farm_id=${farmId}&crop_id=${crop_id}`)
    .then(function(res){
      setBarChart(res.data.image_data);
    })
    .finally(()=>{
      updateBarChartLoading(false);
    })
    .catch(function(error){
      console.log(error.message);
    })
    setCropName(cropNames[crop_id-1])
  }

  
  

  return (
    <>
      <Navbar />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      {loading ? 
      
      (<p>Loading data...</p>) :     (  

        
      //   <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] ">
      //   {/* First column */}


      //   <div className="mx-auto md:mx-0">
      //     <div className="text-green-800 text-4xl md:text-6xl font-normal font-Fredoka flex flex-col items-center justify-center">
      //       {farm.farm_name}
            
      //     </div>
          

      //     <div className="w-full md:w-96 h-screen md:h-80 bg-emerald-100 rounded-3xl mt-6 mx-auto p-3 text-center">
          
      //       <p className="mb-1 text-sm">Farm ID: {farm.farm_id}</p>
      //         <p className="mb-1 text-sm">Farm Name: {farm.farm_name}</p>
      //         <p className="mb-1 text-sm">Location: {farm.longitude}, {farm.latitude}</p>
      //         <p className="mb-1 text-sm">Size (acres): {farm.size_acres}</p>
      //         {/* Add more properties as needed */}
      //         <p className="mb-1 text-sm">Soil Type: {farm.soil_type}</p>
      //         <p className="mb-1 text-sm">Soil pH: {farm.soil_ph}</p>
      //         <p className="mb-1 text-sm">Soil NDVI: {farm.ndvi}</p>
      //         <p className="mb-1 text-sm">Surface LeafCover: {farm.leafcover}</p>
      //         <p className="mb-1 text-sm">Land Surface Temperature: {farm.lst}</p>
      //         <p className="mb-1 text-sm">Soil Moisture: {farm.soilmoisture}</p>
      //         <p className="mb-1 text-sm">Evapo Transpiration: {farm.evapotrans}</p>
      //         {/* Add more properties as needed */}
      //         <p className="mb-1 text-sm">Land Stats Updated Date: {farm.date}</p>

      //       </div>
      //     <div className="flex flex-col md:flex-row md:justify-center gap-4 mt-4 md:mt-11">
      //       <Carousel>
      //         {farmCrops.map((each, index) => (
      //           <div key={index} className="grid col justify-center items-center" hidden="true" >
                  
      //             <img  src={allCropsImg[each.crop_id-1]} className="w-20"></img>
      //             <div className="w-60 h-80 relative">
      //               <div className="w-60 h-80 left-0 top-0 absolute bg-emerald-100 rounded-3xl" />
      //               <div className="w-52 h-56 left-[13.15px] absolute text-green-800 text-md md:text-m font-small font-['Fredoka']">
                    
      //                 Crop Name: {each.crop_name}
      //                 <br/>
      //                 Planting Date: {each.plant_date}
      //                 <br />
      //                 <br />
      //                 <strong>Ideal Growth Conditions:</strong><br/>
      //                 Soil Type: {each.ideal_soil_type}<br/>
      //                 Soil PH: {each.soil_ph_min} to {each.soil_ph_max} <br/>
      //                 Soil Nitrogen: {each.nitrogen_min} to {each.nitrogen_max}<br/>
      //                 Soil Phosphorus: {each.phosphorus_min} to {each.phosphorus_max}<br/>
      //                 Soil Potassium: {each.potassium_min} to {each.potassium_max}<br/>
      //                 <button onClick={()=>getBarChart(each.crop_id)}>Show Land Stats</button>
      //               </div>
      //             </div>
      //           </div>
      //         ))}
      //       </Carousel>
            
      //       <AddCrop farmId={farmId}/>
      //     </div>
      //   </div>
      //   {/* Second column */}
      //   <div className="mt-4 md:mt-8">
          
      //       <div className="text-green-800 text-md md:text-4xl font-normal font-Fredoka max-w-md">
      //         {barChart && (
      //           <div>
      //             <p>Land Stats BarChart for {cropName}:</p>
      //             <img src={`data:image/png;base64,${barChart}`} alt="Land Stats" />
      //           </div>
      //         )}
      //       </div>


      //       <WeatherApp lat={farm.latitude} long={farm.longitude}/>
      //   </div>
        
      // </div>
      // <div className="flex w-full">

      
      <div>
      <div className="flex w-full">

        
        <div className = "flex mb-8 w-full">

          <div className="min-h-2 w-3/4 flex items-center justify-center" >
            <h1 className="text-5xl font-extrabold dark:text-white text-center">{farm.farm_name}</h1>
          </div>
          <div className="w-1/4 min-h-2 flex items-center justify-center">
            <img className="w-full ml-4 object-cover" src={farm.image_url}/>
          </div>
        </div>
        </div>
        <div className = "flex mb-8 w-full">

            <div className="w-2/5">
               <WeatherApp lat={farm.latitude} long={farm.longitude}/>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full items-center justify-center h-100">
            {farmCrops.map((each, index) => (
              <div className="px-10">
                     
                  <div className="flex justify-center items-center mb-2 -mx-2">
                    <img  src={allCropsImg[each.crop_id-1]} className="h-20"></img>
{/* 
                    <p>     {each.crop_name}    </p> */}
                  </div>
                  <div className="flex justify-center items-center -mx-2">
                      <p>
                      <strong>Date Planted - </strong> {each.plant_date}</p>
                  </div>
                      
                       
                       
                  
                  <div className="flex justify-center items-center -mx-2">
                    <p className = {each.ideal_soil_type===farm.soil_type? ("text-green-500") : ("text-red-500")}>Soil Type: {each.ideal_soil_type}</p>
                    <img src={each.ideal_soil_type===farm.soil_type? Correct : Error} className="w-5"></img>
                  </div>
                  <div className="flex justify-center items-center -mx-2">
                    <p>Soil PH: {each.soil_ph_min} to {each.soil_ph_max}</p>
                  </div>
                  <div className="flex justify-center items-center -mx-2">
                    <p>Soil Nitrogen: {each.nitrogen_min} to {each.nitrogen_max}</p>
                  </div>
                  <div className="flex justify-center items-center -mx-2">
                    <p> Soil Phosphorus: {each.phosphorus_min} to {each.phosphorus_max}</p>
                  </div>
                  <div className="flex justify-center items-center -mx-2">
                    <p>Soil Potassium: {each.potassium_min} to {each.potassium_max}</p>
                  </div>
                  <div className="flex justify-center items-center -mx-2">
                    <button onClick={()=>getBarChart(each.crop_id)}>Show Land Stats</button>
                  </div> 
                 
                  </div>
              ))}
            </div> 
        </div>
        <div className="flex mb-8 w-full items-center justify-center">
          <AddCrop farmId={farmId}/>
        </div>
        <div className="flex mb-8 w-full items-center justify-center">
          {barChartLoading? (
            <p>Bar chart is Loading</p>
          ) :
          (null)}
        </div>
        <div className="flex mb-8 w-full items-center justify-center">
        {barChart && (
                <div>
                  <img src={`data:image/png;base64,${barChart}`} alt="Land Stats" />
                </div>
              )}
        </div>
      </div>


      // {/* </div> */}
    )}
      
      
    </>
  );
};

export default Farm;
