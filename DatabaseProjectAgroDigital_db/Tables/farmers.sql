CREATE TABLE farmers
(
  user_id INT NOT NULL,
  farm_id INT NOT NULL,
  CONSTRAINT f_superkey UNIQUE (user_id, farm_id),
  CONSTRAINT f_fk_uid FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT f_fk_fid FOREIGN KEY (farm_id) REFERENCES farms(farm_id),
  CONSTRAINT f_pk PRIMARY KEY (user_id, farm_id),

)
