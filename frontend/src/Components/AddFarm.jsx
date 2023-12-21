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


import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
  })
  




  const AddFarm = ()=>{



  const navigate = useNavigate();
      // Getting district options
  const [districtOptions, setDistrictOptions] = useState([])

  const [csrftoken_x, setCSRF] = useState("")
  useEffect(() => {
    axiosInstance.get("users/csrftoken").then(function(res){
      setCSRF(res.data.csrf_token)
    })
    .catch(function(error){
      console.log(error.message)
    })
  }, []);



  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axiosInstance.get("districts/getdistricts", { withCredentials: true });
        
        setDistrictOptions(response.data);
      } catch (error) {
        console.error("Error Fetching Options", error.message);
      }
    };

    fetchDistricts();
  }, [])



  const [farmData, setFarmData] = useState({
    farm_name: "",
    city: "",
    district_id: 0,
    area: 0,
    address: "",
    landtype: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFarmData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // Add your code to send data to the backend using a POST API
    const longitude = localStorage.getItem("lng");
    const latitude = localStorage.getItem("lat");
    const longlat = {
      "longitude":longitude,
      "latitude":latitude,
    }
    const reqdata = Object.assign({}, farmData, longlat)
    axiosInstance.post("farms/makefarm", reqdata,
     { withCredentials: true,
      headers: {
        "X-CSRFToken":csrftoken_x
      } })
      .then((data) => {
        console.log("Data sent successfully:", data);
        // Optionally, you can navigate to the map or handle success as needed
        navigate("/map", { replace: true });
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        // Handle error as needed
      })
  };






    return (
    <Dialog>
              <DialogTrigger>
                <button className="w-40 h-10 bg-emerald-100 rounded-xl items-center flex justify-center">
                    Add Farm
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
                      onChange={handleInputChange}
                      name="farm_name"
                      type="text"
                      placeholder="Name of the farm"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Enter City Name: </label>
                    <input
                      onChange={handleInputChange}
                      name="city"
                      type="text"
                      placeholder="Name of the City"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Select District: </label>
                    <select
                      className="p-4 pl-10 pr-10 rounded-md"
                      name="district_id"
                      onChange={handleInputChange}
                    >
                      {districtOptions.map((option) => (
                        <option value={option['id']}>
                          {option['name']}
                        </option>
                      ))}
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div>
                    <label>Enter the area of the Farm: </label>
                    <input
                      onChange={handleInputChange}
                      name="farm_size"
                      type="number"
                      placeholder="Area of the farm"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                  </div>
                  <div>
                    <label>Enter the Location of the Farm: </label>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      name="address"
                      placeholder="Location of the farm"
                      className="p-4 pl-10 pr-10 rounded-md"
                    />
                    </div>
                    <div>
                    <label>Enter the Soil Type of the Farm: </label>
                    <select
                      className="p-4 pl-10 pr-10 rounded-md"
                      name="landtype"
                      onChange={handleInputChange}
                    >
                      <option value="clay_soil">Clay Soil</option>
                      <option value="sand_soil">Sand Soil</option>
                      <option value="silty_soil">Silty Soil</option>
                      <option value="peaty_soil">Peaty Soil</option>
                      <option value="chalky_soil">Chalky Soil</option>
                      <option value="loamy_soil">Loamy Soil</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>

                  <Dialog>
                    <DialogTrigger>
                      <div className="flex justify-center">
                        <button
                          className="py-2 px-4 bg-white"
                        >
                          Open Map
                        </button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#5caf74] justify-center">
                     <Map/>
                    </DialogContent>
                  </Dialog>
                  <button type="submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </DialogContent>
            </Dialog>
    )
  }

  export default AddFarm