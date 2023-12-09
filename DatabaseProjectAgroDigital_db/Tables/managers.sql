CREATE TABLE Managers
(
  user_id INT NOT NULL,
  district_id INT NOT NULL,
  CONSTRAINT m_superkey UNIQUE(user_id, district_id),
  CONSTRAINT m_fk_uid FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT m_fk_did FOREIGN KEY (district_id) REFERENCES Districts(district_id),
  CONSTRAINT m_pk PRIMARY KEY (user_id, district_id)
);

CREATE TABLE farms_authorized
(
  manager_id INT NOT NULL,
  farm_id INT NOT NULL
  CONSTRAINT fa_fk_mid FOREIGN KEY (manager_id) REFERENCES users(user_id),
  CONSTRAINT fa_fk_fid FOREIGN KEY (farm_id) REFERENCES Farms(farm_id),
  CONSTRAINT fa_superkey UNIQUE(manager_id, farm_id),
  CONSTRAINT fa_pk PRIMARY KEY (manager_id, farm_id),
);

CREATE TABLE markets_authorized
(
  manager_id INT NOT NULL,
  market_id INT NOT NULL
  CONSTRAINT ma_fk_mnid FOREIGN KEY (manager_id) REFERENCES users(user_id),
  CONSTRAINT ma_fk_mrid FOREIGN KEY (market_id) REFERENCES Markets(market_id),
  CONSTRAINT ma_superkey UNIQUE(manager_id, market_id),
  CONSTRAINT ma_pk PRIMARY KEY (manager_id, market_id)
);
