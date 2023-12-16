import React from "react";
import Navbar from "../components/Navbar.jsx";

const Farm = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr]">
        {/* First column */}
        <div className="mx-auto md:mx-0">
          <div className="text-green-800 text-4xl md:text-6xl font-normal font-Fredoka flex flex-col items-center justify-center">
            Farm Name
          </div>
          <div className="flex flex-col md:flex-row md:justify-center gap-4 mt-4 md:mt-11">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="grid col justify-center items-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl mr-4 md:mr-[100px]" />
                <div className="w-60 h-80 relative">
                  <div className="w-60 h-80 left-0 top-0 absolute bg-emerald-100 rounded-3xl" />
                  <div className="w-52 h-56 left-[13.15px] top-[53.38px] absolute text-green-800 text-md md:text-xl font-medium font-['Fredoka']">
                    Planting Date: 00-00-00
                    <br />
                    Harvest Date: 00-00-00
                    <br />
                    Fertilizer Date: 00-00-00
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-96 h-screen md:h-60 bg-emerald-100 rounded-3xl mt-6 mx-auto" />
        </div>

        {/* Second column */}
        <div className="mt-4 md:mt-8">
          <div className="mt-4 md:mt-8 w-full md:w-96 h-44 bg-emerald-100 flex items-center justify-center">
            <div className="text-green-800 text-md md:text-4xl font-normal font-Fredoka">
              History of Crops
            </div>
          </div>
          <div className="mt-4 md:mt-8 w-full md:w-96 h-44 bg-emerald-100 flex items-center justify-center">
            <div className="text-green-800 text-md md:text-4xl font-normal font-Fredoka">
              Land Details
            </div>
          </div>
          <div className="mt-4 md:mt-8 w-full md:w-96 h-44 bg-emerald-100 flex items-center justify-center">
            <div className="text-green-800 text-md md:text-4xl font-normal font-Fredoka">
              Irrigation Details
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Farm;
