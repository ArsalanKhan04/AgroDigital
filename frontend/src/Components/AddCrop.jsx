import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../Components/ui/dialogue";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
  })
  



const AddCrop = ({farmId})=>{


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

  
    const [cropData, setCropData] = useState(
        {
          farm_id:0,
          crop_id:0,
          plant_date:"",
        }
      );


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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCropData((prevData) => ({ ...prevData, [name]: value }));
      };

    return (
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
    )

}

export default AddCrop;