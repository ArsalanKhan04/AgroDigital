CREATE OR REPLACE ALGORITHM=MERGE VIEW total_farm AS
SELECT 
	ff.user_id as user_id,
	ff.id as farm_id,
    ff.longitude as longitude,
    ff.latitude as latitude,
    ff.farm_name as farm_name,
    ff.size_acres as size_acres,
    fl.soil_type as soil_type,
    fl.soil_ph as soil_ph,
    fl.nitrogen as nitrogen,
    fl.phosphorus as phosphorus,
    fl.potassium as potassium,
    fl.ndvi as ndvi,
    fl.lst as lst,
    fl.leafcover as leafcover,
    fl.evapotrans as evapotrans,
    fl.soilmoisture as soilmoisture,
    fl.date as date
FROM farms_farm as ff JOIN
farms_landconditions as fl ON ff.id=fl.farm_id;

CREATE OR REPLACE ALGORITHM = MERGE VIEW eachfarm_crops AS
SELECT fc.id as crop_id, fc.name as crop_name, fe.plant_date as plant_date, fe.farms_id as farms_id
FROM farms_crops as fc JOIN farms_eachfarmcrop as fe
ON fc.id = fe.crops_id