
CREATE OR REPLACE VIEW latest_landconditions AS
SELECT
    farm_id,
    FIRST_VALUE(soil_type) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_soil_type,
    FIRST_VALUE(soil_ph) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_soil_ph,
    FIRST_VALUE(nitrogen) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_nitrogen,
    FIRST_VALUE(phosphorus) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_phosphorus,
    FIRST_VALUE(potassium) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_potassium,
    FIRST_VALUE(ndvi) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_ndvi,
    FIRST_VALUE(lst) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_landsurftemp,    
    FIRST_VALUE(leafcover) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_leafcover,
    FIRST_VALUE(evapotrans) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_evapotrans,  
    FIRST_VALUE(soilmoisture) OVER (PARTITION BY farm_id ORDER BY date DESC) AS lat_soilmoisture,  
    
    MAX(date) AS latest_date
FROM farms_landconditions
GROUP BY farm_id, soil_type;

SELECT * FROM latest_landconditions;