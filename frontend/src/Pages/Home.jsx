// CarouselComponent.js
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Components/Navbar";
import MainFarms from "../Components/MainFarms"
import "../styles/home.css";
import AddFarm from "../Components/AddFarm"
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
})


const Home = () => {





  

  return (
    <div id="root" className="w-full pt-10">
      <Navbar />
      <div className="w-full">
          <MainFarms/>
            <AddFarm />
      </div>
    </div>
  );
};

export default Home;
