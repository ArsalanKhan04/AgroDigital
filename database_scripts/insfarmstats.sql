-- INSERT INTO farms_cropstats (crop_id, avg_yield, avg_cost)
-- VALUES (2, 1243, 70000),
-- 	(1, 1600, 70000),
--     (3, 2800, 120000);

CREATE OR REPLACE ALGORITHM=MERGE VIEW farm_preds AS
SELECT ff.user_id as user_id,
	ff.id as farm_id, 
    ff.farm_name as farm_name, 
    
    fe.crops_id as crop_id, 
    fcr.name as crop_name,
    size_acres,
	fc.avg_yield*size_acres as pred_yield,
    fc.avg_cost*size_acres as pred_cost
    
    FROM farms_eachfarmcrop as fe
	JOIN farms_farm as ff ON fe.farms_id = ff.id
    JOIN farms_cropstats as fc ON fe.crops_id=fc.crop_id
    JOIN farms_crops as fcr ON fcr.id=fc.crop_id;
    
DELIMITER //
CREATE PROCEDURE GetYield(
	IN user_id_arg INT
    )
    BEGIN
		SELECT * FROM farm_preds WHERE user_id=user_id_arg;
    END  //