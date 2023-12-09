CREATE TABLE Markets
(
  market_id INT PRIMARY KEY IDENTITY (13000, 1),
  address_id INT FOREIGN KEY REFERENCES Address(address_id),
  market_name VARCHAR(40),
)

CREATE TABLE Crop_Prices
(
  market_id INT NOT NULL,
  crop_id INT NOT NULL,
  time_start DATE,
  time_end DATE,
  price DECIMAL(10, 2),
  CONSTRAINT cp_superkey UNIQUE (market_id, crop_id),
  CONSTRAINT cp_fk_cid FOREIGN KEY (crop_id) REFERENCES Crops(crop_id),
  CONSTRAINT cp_fk_mid FOREIGN KEY (market_id) REFERENCES Markets(market_id),
  CONSTRAINT cp_pk PRIMARY KEY (crop_id, market_id)
)
