CREATE TABLE Fertilizers
(
  fertilizer_id INT NOT NULL PRIMARY KEY IDENTITY(5700, 1),
  fertilizer_name VARCHAR(30),
  NitrogenContent DECIMAL(5, 2),
  PhosphorusContent DECIMAL(5, 2),
  PotassiumContent DECIMAL(5, 2)
);

CREATE TABLE Fertilizer_Company
(
  company_id INT PRIMARY KEY IDENTITY(4200, 1),
  address_id INT FOREIGN KEY REFERENCES Address(address_id),
  company_name VARCHAR(25),
);

CREATE TABLE Fertilizers_Recommendations
(
  crop_id INT NOT NULL,
  fertilizer_id INT NOT NULL,
  CONSTRAINT fr_superkey UNIQUE (crop_id, fertilizer_id),
  CONSTRAINT cid_fr_fk FOREIGN KEY (crop_id) REFERENCES Crops(crop_id),
  CONSTRAINT fid_fr_fk FOREIGN KEY (fertilizer_id) REFERENCES Fertilizers(fertilizer_id),
  CONSTRAINT fr_pk PRIMARY KEY (crop_id, fertilizer_id)
);




CREATE TABLE Fertilizers_Vendor
(
  fertilizer_id INT NOT NULL,
  company_id INT NOT NULL,
  CONSTRAINT fv_superkey UNIQUE(fertilizer_id, company_id),
  CONSTRAINT fid_fv_fk FOREIGN KEY (fertilizer_id) REFERENCES Fertilizers(fertilizer_id),
  CONSTRAINT cid_fv_fk FOREIGN KEY (company_id) REFERENCES Fertilizer_Company(company_id),
  CONSTRAINT fv_pk PRIMARY KEY (fertilizer_id, company_id)
)
