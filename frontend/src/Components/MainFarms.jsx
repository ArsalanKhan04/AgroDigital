import client from '../axiosconfig';
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';


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

    return (
        <Carousel className="max-w-3xl">
            {data.map((farm, index) => (
                
                <div key={index} className="border-2 p-4 my-4 bg-white flex items-center" onClick={()=>handleDivClick(farm.farm_id)} style={{ cursor: 'pointer' }}>
                <div className="flex-grow max-w-sm">
                    <h3 className="text-md font-semibold mb-2">{farm.farm_name}</h3>
                    <p className="mb-2">Farm ID: {farm.farm_id}</p>
                    <p className="mb-2">Farm Name: {farm.farm_name}</p>
                    <p className="mb-2">Location: {farm.longitude}, {farm.latitude}</p>
                    <p className="mb-2">Size (acres): {farm.size_acres}</p>
                    {/* Add more properties as needed */}
                    <p className="mb-2">Soil Type: {farm.soil_type}</p>
                    <p className="mb-2">Soil pH: {farm.soil_ph}</p>
                    <p className="mb-2">Soil NDVI: {farm.ndvi}</p>
                    <p className="mb-2">Surface LeafCover: {farm.leafcover}</p>
                    <p className="mb-2">Land Surface Temperature: {farm.lst}</p>
                    <p className="mb-2">Soil Moisture: {farm.soilmoisture}</p>
                    <p className="mb-2">Evapo Transpiration: {farm.evapotrans}</p>
                    {/* Add more properties as needed */}
                    <p className="mb-2">Land Stats Updated Date: {farm.date}</p>
                </div>
                <img
                    src={farm['image_url']}
                    alt={`Farm Image - ${farm.farm_name}`}
                    className="max-w-sm h-auto ml-4 object-cover"
                />
                </div>
            ))}
    </Carousel>
    )
}

export default MainFarms;