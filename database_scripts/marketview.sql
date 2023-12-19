CREATE OR REPLACE VIEW marketview AS
SELECT dd.id AS district_id, market_name, address, city FROM districts_markets AS dm
	JOIN districts_address AS da ON dm.address_id = da.id
    JOIN districts_districts AS dd ON da.district_id=dd.id;
    
DELIMITER //
CREATE PROCEDURE GetMarkets() 
BEGIN
	SELECT * FROM marketview;
END//



DELIMITER //
DROP PROCEDURE GetMarketsRate//
CREATE PROCEDURE GetMarketsRate(
	IN district_id_arg INT
    )
BEGIN
	SELECT fc.name, dd.min_price, dd.max_price, fc.id FROM districts_districtrate AS dd JOIN farms_crops as fc ON fc.id=dd.crop_id WHERE district_id=district_id_arg;
END //