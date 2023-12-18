import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  // State variable to store the marker coordinates
  const [markerCoordinates, setMarkerCoordinates] = useState([33.6844, 73.0479]);

  useEffect(() => {
    const mymap = L.map("map").setView(markerCoordinates, 13);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mymap);

    // Set the height of the map container to 100vh and the width to 100vw
    document.getElementById("map").style.height = "95vh";
    document.getElementById("map").style.width = "70vw";

    // Create a close button
    const closeButton = document.createElement("div");
    closeButton.innerHTML = "&times;"; // Use "x" as the close symbol
    closeButton.style.cursor = "pointer";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.backgroundColor = "white";
    closeButton.style.border = "1px solid #999";
    closeButton.style.padding = "5px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.zIndex = 1; // Set the z-index

    // Append the close button to the parent container
    document.getElementById("map").appendChild(closeButton);

    // Create a draggable marker
    const marker = L.marker(markerCoordinates, { draggable: true }).addTo(mymap);

    // Event listener for dragend
    marker.on("dragend", (event) => {
      const newCoordinates = event.target.getLatLng();
      setMarkerCoordinates([newCoordinates.lat, newCoordinates.lng]);
      localStorage.setItem('lat', newCoordinates.lat);
      localStorage.setItem('lng', newCoordinates.lng);
      console.log("Marker dragged to:", markerCoordinates);
    });

    return () => {
      mymap.remove();
    };
  }, [markerCoordinates]); // Include markerCoordinates as a dependency for the useEffect

  // Use markerCoordinates as needed in your component or pass it to the backend

  return (
    <>
      <div id="map" className="bg-gray-300 relative">
        {/* Map container */}
      </div>
    </>
  );
};

export default Map;
