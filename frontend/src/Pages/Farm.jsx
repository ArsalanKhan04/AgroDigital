import React from "react";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Components/Navbar.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialogue";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Crop1 from "../static/imgs/crop_1.png"
import Crop2 from "../static/imgs/crop_2.png"
import Crop3 from "../static/imgs/crop_3.png"

const allCropsImg = [Crop1, Crop2, Crop3]

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
})

const Farm = () => {
  const { farmId } = useParams();


  const [cropData, setCropData] = useState(
    {
      farm_id:0,
      crop_id:0,
      plant_date:"",
    }
  );

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

  const [cropOptions, setCropOptions] = useState([]);
  // Our first API request will be to get all the crops
  useEffect(() => {
    axiosInstance.get("farms/getcrops")
  .then(function(res){
    setCropOptions(res.data)
  }
  )
  .catch(function(err){
    console.log(err.message)
  }
  )
  }
  ,[]
  )

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
  }, [cropData])


  const handleSubmit = () => {
    setCropData({farm_id:farmId})
    axiosInstance.post("farms/addcrop", cropData,
     { withCredentials: true,
      headers: {
        "X-CSRFToken":csrftoken_x
      } })
      .then((data) => {
        console.log("Data sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        // Handle error as needed
      })
  };


  const [landNutrients, setLandNutrients] = useState(
    {
      nitrogen:0,
      phosphorus:0,
      potassium:0
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const [barChart, setBarChart] = useState(null)
  const [cropName, setCropName] = useState("")
  const cropNames = ["Rice", "Wheat", "Sugarcane"]
  const getBarChart = (crop_id) => {
    axiosInstance.get(`farms/getcrophistoryimage?farm_id=${farmId}&crop_id=${crop_id}`)
    .then(function(res){
      setBarChart(res.data.image_data);
    })
    .catch(function(error){
      console.log(error.message);
    })
    setCropName(cropNames[crop_id-1])
  }

  
  

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr] ">
        {/* First column */}
        <div className="mx-auto md:mx-0">
          <div className="text-green-800 text-4xl md:text-6xl font-normal font-Fredoka flex flex-col items-center justify-center">
            {farm.farm_name}
            
          </div>
          

          <div className="w-full md:w-96 h-screen md:h-80 bg-emerald-100 rounded-3xl mt-6 mx-auto p-3 text-center">
          
            <p className="mb-1 text-sm">Farm ID: {farm.farm_id}</p>
              <p className="mb-1 text-sm">Farm Name: {farm.farm_name}</p>
              <p className="mb-1 text-sm">Location: {farm.longitude}, {farm.latitude}</p>
              <p className="mb-1 text-sm">Size (acres): {farm.size_acres}</p>
              {/* Add more properties as needed */}
              <p className="mb-1 text-sm">Soil Type: {farm.soil_type}</p>
              <p className="mb-1 text-sm">Soil pH: {farm.soil_ph}</p>
              <p className="mb-1 text-sm">Soil NDVI: {farm.ndvi}</p>
              <p className="mb-1 text-sm">Surface LeafCover: {farm.leafcover}</p>
              <p className="mb-1 text-sm">Land Surface Temperature: {farm.lst}</p>
              <p className="mb-1 text-sm">Soil Moisture: {farm.soilmoisture}</p>
              <p className="mb-1 text-sm">Evapo Transpiration: {farm.evapotrans}</p>
              {/* Add more properties as needed */}
              <p className="mb-1 text-sm">Land Stats Updated Date: {farm.date}</p>

            </div>
          <div className="flex flex-col md:flex-row md:justify-center gap-4 mt-4 md:mt-11">
            <Carousel>
              {farmCrops.map((each, index) => (
                <div key={index} className="grid col justify-center items-center">
                  
                  <div className="w-60 h-80 relative">
                    <div className="w-60 h-80 left-0 top-0 absolute bg-emerald-100 rounded-3xl" />
                    <div className="w-52 h-56 left-[13.15px] absolute text-green-800 text-md md:text-m font-small font-['Fredoka']">
                    <div className="w-12 h-12 rounded-3xl mr-4 md:mr-[100px]">
                      <img src={allCropsImg[each.crop_id-1]} className="w-full h-full object-cover"></img>
                    </div>
                      Crop Name: {each.crop_name}
                      <br/>
                      Planting Date: {each.plant_date}
                      <br />
                      <br />
                      <strong>Ideal Growth Conditions:</strong><br/>
                      Soil Type: {each.ideal_soil_type}<br/>
                      Soil PH: {each.soil_ph_min} to {each.soil_ph_max} <br/>
                      Soil Nitrogen: {each.nitrogen_min} to {each.nitrogen_max}<br/>
                      Soil Phosphorus: {each.phosphorus_min} to {each.phosphorus_max}<br/>
                      Soil Potassium: {each.potassium_min} to {each.potassium_max}<br/>
                      <button onClick={()=>getBarChart(each.crop_id)}>Show Land Stats</button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            
            <Dialog>
            <DialogTrigger>
              <button className="w-40 h-10 bg-emerald-100 rounded-3xl items-center flex justify-center mt-2">
                <div className="text-green-800 text-xl font-bold font-['Fredoka']">
                  Add Crop
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#5caf74] justify-center">
              <div className="mt-4 flex justify-center">
                Add the Details for the Crop !
              </div>
              <div className="grid grid-col">
                <div>
                  <label>Enter the Planting date of the crop: </label>
                  <input
                    onChange={handleInputChange}
                    type="date"
                    name="plant_date"
                    placeholder="Name of the farm"
                    className="p-4 pl-10 pr-10 rounded-md"
                    pattern="\d{4}-\d{2}-\d{2}"
                  />
                </div>

                <div>
                  <label>Select Crop: </label>
                  <select
                    className="p-4 pl-10 pr-10 rounded-md"
                    onChange={handleInputChange}
                    name="crop_id"
                  >
                    {
                      cropOptions.map((each, index)=>(
                        <option value={each.id}>{each.crop_name}</option>
                      ))
                    }

                    {/* Add more options as needed */}
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>
        
        {/* Second column */}
        <div className="mt-4 md:mt-8">
          
            <div className="text-green-800 text-md md:text-4xl font-normal font-Fredoka max-w-md">
              {barChart && (
                <div>
                  <p>Land Stats BarChart for {cropName}:</p>
                  <img src={`data:image/png;base64,${barChart}`} alt="Land Stats" />
                </div>
              )}
            </div>
        </div>
        
      </div>
    </>
  );
};

export default Farm;
