CREATE VIEW ExpectedTimeView as
SELECT 
farms_id,
crops_id, 
stage, 
DATE_ADD(plant_date, INTERVAL date_difference DAY) as stage_date

FROM farms_eachfarmcrop JOIN cropsdurationview ON crops_id=crop_id;

CREATE VIEW NasaChartView as
SELECT
	farms_id,
	crops_id,
	stage,
	stage_date,
    longitude,
    latitude
FROM ExpectedTimeView JOIN farms_farm ON farms_id=id;

DELIMITER //
DROP PROCEDURE GetNasaChart;
CREATE PROCEDURE GetNasaChart (
	IN farms_id_arg INT,
    IN crops_id_arg INT
)
BEGIN
	SELECT longitude, latitude, stage, stage_date FROM NasaChartView
    WHERE farms_id=farms_id_arg and crops_id=crops_id_arg;
END //    
