DROP PROCEDURE UpdateNutrients;
DROP PROCEDURE UpdateNASA;
DELIMITER //
DROP PROCEDURE MakeLandConditions;
CREATE PROCEDURE MakeLandConditions (
	IN soil_type_arg	varchar(20),
	IN farm_id_arg	bigint,
    OUT conditions_id bigint
)
BEGIN
	INSERT INTO farms_landconditions (
		soil_type,
        farm_id,
        date
	)
    VALUES (
		soil_type_arg,
        farm_id_arg,
        CURDATE()
    );
    SET conditions_id = LAST_INSERT_ID();
END //


DELIMITER //
CREATE PROCEDURE UpdateNutrients(
    IN nitrogen_val DECIMAL(5,2),
    IN phosphorus_val DECIMAL(5,2),
    IN potassium_val DECIMAL(5,2),
    IN soil_ph_val DOUBLE,
    IN farm_id_arg BIGINT
)
BEGIN
    UPDATE farms_landconditions
    SET 
        nitrogen = nitrogen_val,
        phosphorus = phosphorus_val,
        potassium = potassium_val,
        soil_ph = soil_ph_val
	WHERE
        farm_id = farm_id_arg;
END //

CREATE PROCEDURE UpdateNASA (
	IN LST_val double,
    IN ndvi_val double,
    IN leafcover_val double,
    IN soilmoisture_val double,
    IN evapotrans_val double,
    IN farm_id_arg INT
    )
BEGIN
	UPDATE farms_landconditions
	SET
		lst = LST_val,
        ndvi = ndvi_val,
        leafcover = leafcover_val,
        soilmoisture = soilmoisture_val,
        evapotrans = evapotrans_val
	WHERE farm_id = farm_id_arg;
END //


DELIMITER ;