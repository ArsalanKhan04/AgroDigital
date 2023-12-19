CREATE OR REPLACE VIEW cropsdurationview AS 
SELECT 
    crop_id,
    stage,
    DATEDIFF(date_start, (
        SELECT date_start 
        FROM farms_cropstimeline AS inner_table 
        WHERE inner_table.crop_id = outer_table.crop_id 
            AND inner_table.stage = 'plant'
    )) AS date_difference
FROM farms_cropstimeline AS outer_table;