// CarouselComponent.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialogue";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div id="root">
      <Navbar />
      <div className="grid grid-cols-2 md:grid-cols-[2fr,1fr]">
        {/* First column */}
        <div>
          <div className="bg-gray-300 rounded-md py-20 w-[400px] mt-[70px] ml-[55px]" />
          <div className="flex gap-6 ml-20 mt-4">
            <Dialog>
              <DialogTrigger>
                <button className="w-40 h-10 bg-emerald-100 rounded-3xl items-center flex justify-center">
                  <div className="text-green-800 text-xl font-bold font-['Fredoka']">
                    Add Farm
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#5caf74] justify-center">
                <div className="mt-4 flex justify-center">
                  Add the Details for the Farm !
                </div>
                <div className="grid grid-col">
                  <div>
                    <label>Enter the name of the Farm: </label>
                    <input
                      type="text"
                      placeholder="Name of the farm"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Enter the area of the Farm: </label>
                    <input
                      type="number"
                      placeholder="Area of the farm"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Enter the Location of the Farm: </label>
                    <input
                      type="text"
                      placeholder="Location of the farm"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate("/map", { replace: true })}
                      className="py-2 px-4 bg-white"
                    >
                      Open Map
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <button className="w-40 h-10 bg-emerald-100 rounded-3xl items-center flex justify-center mt-2">
              <div className="text-green-800 text-xl font-bold font-['Fredoka']">
                Delete Farm
              </div>
            </button>
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
