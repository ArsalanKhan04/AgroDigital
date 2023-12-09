-- INSERT INTO Districts VALUES
-- ('Gujranwala'),('Sheikhupura'),('Lahore');

-- Insert values into the Address table with references to Districts

-- INSERT INTO Address (address, city, district_id) VALUES
-- ('Street 13, Asghar Colony', 'Gujranwala',8000 ),
-- ('Lahore Road', 'Sheikhupura', 8001),
-- ('Askari 1', 'Lahore', 8002);

--Inserting Data into Farms
-- INSERT INTO Farms
-- VALUES(10000),(10001),(10002);

-- Insert data into the areacover table with references to Farms
-- INSERT INTO areacover (farm_id, long_start, long_end, lat_start, lat_end) VALUES
-- (53000, 72.123, 72.456, 31.789, 32.012),
-- (53001, 73.234, 73.567, 33.890, 34.123),
-- (53002, 74.345, 74.678, 35.901, 36.234);

EXEC sp_columns 'farms';
