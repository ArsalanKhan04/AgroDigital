// CarouselComponent.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  return (
    <div id="root">
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-[2fr,1fr]">
        {/* First column */}
        <div>
          <div className="bg-gray-300 rounded-md py-20 w-[400px] mt-[70px] ml-[55px]" />
          <div className="flex gap-6 ml-20 mt-4">
            <div className="w-40 h-10 bg-emerald-100 rounded-3xl" />
            <div className="w-40 h-10 bg-emerald-100 rounded-3xl" />
          </div>
          <div>
            <div className="w-[500px] h-[217px] bg-emerald-100 rounded-3xl mt-6 ml-[25px]" />
          </div>
        </div>

        {/* Second column */}
        <div className="mt-4 md:mt-8">
          {/* Adjusted margin for the second column */}
          <div className="mt-8 flex gap-6">
            <div className="w-28 h-28 bg-emerald-100 rounded-3xl" />
            <div className="w-72 h-28 bg-emerald-100 rounded-3xl" />
          </div>

          <div className="mt-8 flex gap-6">
            <div className="w-28 h-28 bg-emerald-100 rounded-3xl" />
            <div className="w-72 h-28 bg-emerald-100 rounded-3xl" />
          </div>

          <div className="mt-8 flex gap-6">
            <div className="w-28 h-28 bg-emerald-100 rounded-3xl" />
            <div className="w-72 h-28 bg-emerald-100 rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
