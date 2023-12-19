DROP PROCEDURE IF EXISTS MakeAddress;
Drop PROCEDURE IF EXISTS MakeFarm;

DELIMITER //



CREATE PROCEDURE MakeAddress (
	IN district_id_arg INT, 
	IN address_arg VARCHAR(100), 
	IN city_arg VARCHAR(30),
    OUT result_id INT)
BEGIN
	INSERT INTO districts_address (district_id, address, city) 
		VALUES (district_id_arg, address_arg, city_arg);
	SET result_id = LAST_INSERT_ID();
END //


CREATE PROCEDURE MakeFarm (
	IN longitude_arg decimal(9,6), 
	IN latitude_arg decimal(9,6), 
    IN address_id_arg INT, 
    IN user_id_arg INT, 
    IN name_arg VARCHAR(100), 
    IN size_acres_arg double,
    OUT result_id INT
    )
BEGIN
	INSERT INTO farms_farm (
		longitude, 
        latitude, 
        address_id, 
        user_id, 
        size_acres, 
        farm_name) 
    VALUES (
		longitude_arg, 
		latitude_arg, 
        address_id_arg, 
        user_id_arg, 
        size_acres_arg, 
        name_arg);
	SET result_id = LAST_INSERT_ID();
END //


DELIMITER //

DROP PROCEDURE IF EXISTS MakeCompleteFarm //
CREATE PROCEDURE MakeCompleteFarm(
	IN longitude_arg decimal(9,6), 
    IN latitude_arg decimal(9,6),
    IN user_id_arg INT, 
    IN name_arg VARCHAR(100), 
    IN size_acres_arg double, 
    IN district_id_arg INT, 
    IN address_arg VARCHAR(100), 
    IN city_arg VARCHAR(30),
    IN land_type VARCHAR(20),
    OUT result_id INT
    )
BEGIN
	DECLARE address_id_arg INT;
    DECLARE conditions_id INT;
	START TRANSACTION;
	CALL MakeAddress(district_id_arg, address_arg, city_arg, result_id);
    
    SET address_id_arg = result_id;
    
    CALL MakeFarm(
		longitude_arg, 
		latitude_arg, 
        address_id_arg, 
        user_id_arg, 
        name_arg,
        size_acres_arg, 
        result_id);
    
    CALL MakeLandConditions(
		land_type,
        result_id,
        conditions_id);
        
	SELECT result_id;
    
	COMMIT;
END //

CREATE PROCEDURE DeleteFarm (IN farm_id INT)
BEGIN
	DELETE FROM farms_farm 
    WHERE id = farm_id;
END //


DELIMITER //
DROP PROCEDURE AddCrop //
CREATE PROCEDURE AddCrop (IN farm_id_arg INT, IN crop_id_arg INT, plant_date_arg DATE)
BEGIN 
	INSERT INTO farms_eachfarmcrop (farms_id, crops_id, plant_date)
    VALUES (farm_id_arg, crop_id_arg, plant_date_arg);
END //	


DELIMITER ;