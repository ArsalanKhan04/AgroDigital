import React from "react";
import Navbar from "../components/Navbar";
const Forum = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="flex-col flex items-center">
          <div className="flex items-center gap-6 mt-8">
            <div className="text-green-800 text-2xl font-medium font-'Fredoka'">
              Search here:
            </div>
            <input className="w-96 h-14 bg-emerald-100 rounded-3xl" />
          </div>
        </div>
        <div className="flex justify-between ml-16 mr-16 mt-8">
          <div className="w-96 text-green-800 text-5xl font-semibold font-['Fredoka']">
            Trending topics
          </div>
          <div className="w-72 h-14 bg-emerald-100 rounded-3xl" />
        </div>
        <div className="flex-col items-center flex gap-8 mt-6">
          <div className="w-[70%] h-20 bg-emerald-100 rounded-3xl" />
          <div className="w-[70%] h-20 bg-emerald-100 rounded-3xl" />
          <div className="w-[70%] h-20 bg-emerald-100 rounded-3xl" />
        </div>
      </div>
    </>
  );
};

export default Forum;
