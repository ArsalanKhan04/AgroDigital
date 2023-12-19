CREATE VIEW coordview AS
SELECT id, latitude, longitude 
FROM 
farms_farm;

DELIMITER //
CREATE PROCEDURE GetCoords (
	IN farm_id INT
)
BEGIN
    SELECT * FROM coordview
    WHERE id=farm_id;
END //