
CREATE OR REPLACE VIEW crops_details AS
SELECT crop_id, 
	name,
	plant_date, 
    soil_type, 
    fe.farms_id as farm_id, 
    soil_ph_min, 
    soil_ph_max, 
    nitrogen_min,
    nitrogen_max,
    phosphorus_min,
    phosphorus_max,
    potassium_min,
    potassium_max
    FROM farms_eachfarmcrop as fe
	join farms_idealcropconditions as fi ON 
		fe.crops_id = fi.crop_id
			join farms_crops as fc
				ON fe.crops_id = fc.id;

DROP PROCEDURE getcrops_details;
DELIMITER //
CREATE PROCEDURE getcrops_details
	(
		IN farm_id_arg INT
        )
BEGIN
        SELECT * FROM crops_details where farm_id=farm_id_arg;
END //        
