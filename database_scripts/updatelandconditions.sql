DELIMITER //
CREATE PROCEDURE MakeLandConditions (
	IN soil_type_arg	varchar(20),
	IN farm_id_arg	bigint
)
BEGIN
	INSERT INTO farms_landconditions (
		soil_type,
        farm_id
	)
    VALUES (
		soil_type_arg,
        farm_id_arg
    );
END //

CREATE PROCEDURE UpdatePH (IN ph double, IN farm_id_arg bigint)
BEGIN
	UPDATE farms_landconditions
    SET soil_ph = ph
    WHERE farm_id = farm_id_arg;
END //

-- Update Nitrogen
CREATE PROCEDURE UpdateNitrogen(IN nitrogen_val DECIMAL(5,2), IN farm_id_arg BIGINT)
BEGIN
    UPDATE farms_landconditions
    SET nitrogen = nitrogen_val
    WHERE farm_id = farm_id_arg;
END //

-- Update Phosphorus
CREATE PROCEDURE UpdatePhosphorus(IN phosphorus_val DECIMAL(5,2), IN farm_id_arg BIGINT)
BEGIN
    UPDATE farms_landconditions
    SET phosphorus = phosphorus_val
    WHERE farm_id = farm_id_arg;
END //

-- Update Potassium
CREATE PROCEDURE UpdatePotassium(IN potassium_val DECIMAL(5,2), IN farm_id_arg BIGINT)
BEGIN
    UPDATE farms_landconditions
    SET potassium = potassium_val
    WHERE farm_id = farm_id_arg;
END //

-- Update NDVI
CREATE PROCEDURE UpdateNDVI(IN ndvi_val DOUBLE, IN farm_id_arg BIGINT)
BEGIN
    UPDATE farms_landconditions
    SET ndvi = ndvi_val
    WHERE farm_id = farm_id_arg;
END //

-- Update LST
CREATE PROCEDURE UpdateLST(IN lst_val DOUBLE, IN farm_id_arg BIGINT)
BEGIN
    UPDATE farms_landconditions
    SET lst = lst_val
    WHERE farm_id = farm_id_arg;
END //

-- Update Leafcover
CREATE PROCEDURE UpdateLeafcover(IN leafcover_val DOUBLE, IN farm_id_arg BIGINT)
BEGIN
    UPDATE farms_landconditions
    SET leafcover = leafcover_val
    WHERE farm_id = farm_id_arg;
END //

CREATE PROCEDURE UpdateNutrients(
    IN nitrogen_val DECIMAL(5,2),
    IN phosphorus_val DECIMAL(5,2),
    IN potassium_val DECIMAL(5,2),
    IN farm_id_arg BIGINT
)
BEGIN
    UPDATE farms_landconditions
    SET 
        nitrogen = nitrogen_val,
        phosphorus = phosphorus_val,
        potassium = potassium_val
    WHERE farm_id = farm_id_arg;
END //


DELIMITER ;