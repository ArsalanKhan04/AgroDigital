DELIMITER //
CREATE PROCEDURE MakeAddress (IN district_id_arg INT, IN address_arg VARCHAR(100), IN city_arg VARCHAR(30))
BEGIN
	INSERT INTO districts_address (district_id, address, city) VALUES (district_id_arg, address_arg, city_arg);
END //


CREATE PROCEDURE MakeFarm (IN longitude_arg decimal(9,6), IN latitude_arg decimal(9,6), IN address_id_arg INT, IN user_id_arg INT)
BEGIN
	INSERT INTO farms_farm (longitude, latitude, address_id, user_id) 
    VALUES (longitude_arg, latitude_arg, address_id_arg, user_id_arg);
END //

CREATE PROCEDURE DeleteFarm (IN farm_id INT)
BEGIN
	DELETE FROM farms_farm 
    WHERE id = farm_id;
END //

CREATE PROCEDURE AddCrop (IN farm_id INT, IN crop_id INT)
BEGIN 
	INSERT INTO farms_farm_crops (farm_id, crop_id)
    VALUES (farm_id_arg, crop_id_arg);
END //	


DELIMITER ;