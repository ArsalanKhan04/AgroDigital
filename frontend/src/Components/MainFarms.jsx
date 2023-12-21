import client from '../axiosconfig';
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import SoilComponent from "./SoilComponent"

const MainFarms = () => {
    const navigate = useNavigate();
    const [data, updateData ]= useState([])
    useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await client.get('farms/getfarms');
            console.log(response.data)
            updateData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDivClick = (arg) => {
        navigate(`/farm/${arg}`, { replace: true } )
    };

    if (data){
        return (
            <div className="w-full">
                
                {data.map((farm, index) => (
                   
                   <div key={index} className="border-2 p-4 my-4 bg-white items-center w-full" onClick={()=>handleDivClick(farm.farm_id)} style={{ cursor: 'pointer' }}>
                   <div className="w-full flex items-center justify-center">
                       <h1 className="w-2/3 text-md font-semibold mb-2 text-center">{farm.farm_name}</h1>
                        <img
                            src={farm['image_url']}
                            alt={`Farm Image - ${farm.farm_name}`}
                            className="w-1/3 h-auto ml-4 object-cover"
                        />
                    </div>
                    <div>
                       <p className="mb-2">Location: {farm.longitude}, {farm.latitude}</p>
                       <p className="mb-2">Size (acres): {farm.size_acres}</p>
                       {/* Add more properties as needed */}
                       <SoilComponent soilType={farm.soil_type} />
                       <p className="mb-2">Soil pH: {farm.soil_ph}</p>
                       <p className="mb-2">Soil NDVI: {farm.ndvi}</p>
                       <p className="mb-2">Surface LeafCover: {farm.leafcover}</p>
                       <p className="mb-2">Land Surface Temperature: {farm.lst}</p>
                       <p className="mb-2">Soil Moisture: {farm.soilmoisture}</p>
                       <p className="mb-2">Evapo Transpiration: {farm.evapotrans}</p>
                       {/* Add more properties as needed */}
                       <p className="mb-2">Land Stats Updated Date: {farm.date}</p>
                   </div>
                   </div>
               ))}

            </div>
        )
    }
    else {
        return null;
    }
    
}

export default MainFarms;