-- Write your own SQL object definition here, and it'll be included in your package.
/*CREATE TABLE Crops (
    crop_id INT PRIMARY KEY IDENTITY(100, 1),
    crop_name VARCHAR(30),
    crop_season VARCHAR(30)
);

CREATE TABLE Crop_Conditions (
    crop_id INT PRIMARY KEY FOREIGN KEY REFERENCES Crops(crop_id),
    temp_low FLOAT,
    temp_high FLOAT,
    plant_start DATE,
    plant_end DATE,
    harvest_start DATE,
    harvest_end DATE
    -- Need to add more columns into this as well
);*/

CREATE TABLE farm_crops (
    crop_id INT NOT NULL,
    farm_id INT NOT NULL,
    planting_date DATE,
    harvest_prediction DATE,
    CONSTRAINT fc_superkey UNIQUE (crop_id, farm_id),
    CONSTRAINT fk_crop FOREIGN KEY (crop_id) REFERENCES Crops(crop_id),
    CONSTRAINT fk_farm FOREIGN KEY (farm_id) REFERENCES Farms(farm_id),
    CONSTRAINT pk_farm_crops PRIMARY KEY (crop_id, farm_id)
);

CREATE TABLE district_productions (
    district_id INT NOT NULL,
    crop_id INT NOT NULL,
    production INT, -- Production in tonnes
    CONSTRAINT dp_superkey UNIQUE (district_id, crop_id),
    CONSTRAINT fk_district FOREIGN KEY (district_id) REFERENCES Districts(district_id),
    CONSTRAINT fk_crop FOREIGN KEY (crop_id) REFERENCES Crops(crop_id),
    CONSTRAINT pk_dis_prod PRIMARY KEY (district_id, crop_id)
);
