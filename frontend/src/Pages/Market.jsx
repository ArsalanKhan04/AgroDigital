import React from "react";
import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Crop1 from "../static/imgs/crop_1.png"
import Crop2 from "../static/imgs/crop_2.png"
import Crop3 from "../static/imgs/crop_3.png"
const crop_imgs = [Crop1, Crop2, Crop3]

import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
})




const Market = () => {

    const [allMarkets, updateAllMarkets] = useState([])
    useEffect(() => {
        axiosInstance.get("districts/getmarkets")
        .then(function(res){
            updateAllMarkets(res.data)
        })
        .catch(function(error){
            console.log(error.message)
        });
    }, [])


    const [currMarketName, updateCurrMarketName] = useState("");
    const [prices, updatePrices] = useState([]);

    const getUpdatedPrices = (district_id, markName) => {
        axiosInstance.get(`districts/getmarketrates?district_id=${district_id}`)
        .then(function(res){
            updatePrices(res.data);
        })
        .catch(function(error){
            console.log(error.message);
        })
        updateCurrMarketName(markName)
    }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="flex-col flex items-center">
          <div className="flex items-center gap-6 mt-8">
          </div>
        </div>
        <div className="flex justify-between ml-16 mr-16 mt-8">
          <div className="w-96 text-green-800 text-5xl font-semibold font-['Fredoka']">
            Markets
          </div>
          <div className="w-72 h-14 bg-emerald-100 rounded-3xl" />
        </div>
        <div className="flex-col items-center flex gap-8 mt-6">
        <div className="container mx-auto p-10 rounded-lg h-40">
        <Carousel>
            {allMarkets.map((each, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-lg">
                <h3 className="text-xl font-semibold mb-2">
                <strong>Market Name: </strong>
                {each.market_name}
                </h3>
                <p className="text-base">
                <strong>Address: </strong>
                {each.address}
                </p>
                <p className="text-base">
                <strong>City: </strong>
                {each.city}
                </p>
                <button border onClick={()=>{
                    getUpdatedPrices(each.district_id, each.city)
                }}>Check Market Rates</button>
            </div>
            ))}
        </Carousel>
        </div>
        <div>
        <div className="container mx-auto p-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              :)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Crop Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max Price
            </th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, index) => (
            <tr key={index} className={(index + 1) % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900"><img className="w-16" src={crop_imgs[price.crop_id-1]}></img>{}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{price.crop_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{price.min_price}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{price.max_price}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        </div>
          <div className="w-[70%] h-20 bg-emerald-100 rounded-3xl" />
          <div className="w-[70%] h-20 bg-emerald-100 rounded-3xl" />
        </div>
      </div>
    </>
  );
};

export default Market;
