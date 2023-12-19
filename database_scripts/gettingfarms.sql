DELIMITER //
-- Need to add farm data along with this like landconditions and crops on it 
CREATE PROCEDURE getfarms (
	IN user_id_arg INT
)
BEGIN
	SELECT * FROM total_farm WHERE user_id=user_id_arg;
END //

CREATE PROCEDURE getfarm (
	IN farm_id_arg INT
)
BEGIN 
	SELECT * FROM total_farm WHERE farm_id=farm_id_arg;
END //

DELIMITER //
Drop procedure getcrops//
CREATE PROCEDURE getcrops (
	IN farm_id_arg INT
)
BEGIN
	SELECT crop_id, crop_name, plant_date FROM eachfarm_crops
    WHERE farms_id = farm_id_arg;
END //
    
