import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  useEffect(() => {
    const nustCoordinates = [33.6844, 73.0479]; // NUST Islamabad coordinates

    const mymap = L.map("map").setView(nustCoordinates, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mymap);

    // Set the height of the map container to 100vh and the width to 100vw
    document.getElementById("map").style.height = "100vh";
    document.getElementById("map").style.width = "100vw";

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
    closeButton.style.zIndex = 4; // Set the z-index

    closeButton.onclick = () => {
      // Handle routing when the close button is clicked
      // For this example, it navigates to the path "/"
      window.location.href = "/";
    };

    // Append the close button to the parent container
    document.getElementById("map").appendChild(closeButton);

    return () => {
      mymap.remove();
    };
  }, []);

  return (
    <>
      <div id="map" className="bg-gray-300 relative">
        {/* Map container */}
      </div>
    </>
  );
};

export default Map;
