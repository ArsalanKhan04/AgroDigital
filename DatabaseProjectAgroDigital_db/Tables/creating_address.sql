CREATE TABLE Districts (
    district_id INT PRIMARY KEY IDENTITY(8000, 1),
    district_name VARCHAR(30)
);

CREATE TABLE Address (
    address_id INT PRIMARY KEY IDENTITY(10000, 1),
    address VARCHAR(30),
    city VARCHAR(30),
    district_id INT FOREIGN KEY REFERENCES Districts(district_id)
);

CREATE TABLE Farms (
    farm_id INT PRIMARY KEY IDENTITY (53000, 1),
    address_id INT REFERENCES Address(address_id),
);

CREATE TABLE areacover (
    farm_id INT PRIMARY KEY FOREIGN KEY REFERENCES Farms(farm_id),
    long_start FLOAT,
    long_end FLOAT,
    lat_start FLOAT,
    lat_end FLOAT
);

