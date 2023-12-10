create database agroace

use agroace 

CREATE TABLE farmer (
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE crop (
  id INT NOT NULL ,
  name VARCHAR(50) NOT NULL,
  variety VARCHAR(50) NOT NULL,
  planted_date DATE NOT NULL,
  harvested_date DATE,
  expected_yield INT,
  actual_yield INT,
  unit_of_measure VARCHAR(10),
  farmer_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (farmer_id) REFERENCES farmer(id)
);

CREATE TABLE irrigation (
  id INT NOT NULL  ,
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  amount INT,
  crop_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (crop_id) REFERENCES crop(id)
);


CREATE TABLE pest_management (
  id INT NOT NULL ,
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  chemical_used VARCHAR(50),
  crop_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (crop_id) REFERENCES crop(id)
);


CREATE TABLE financial_management (
  id INT NOT NULL ,
  date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  crop_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (crop_id) REFERENCES crop(id)
);

CREATE TABLE inventory_management (
  id INT NOT NULL ,
  name VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  unit_of_measure VARCHAR(10),
  crop_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (crop_id) REFERENCES crop(id)
);

create table users
(
	email varchar(50) primary key, 
	password varchar(20) , 
	role varchar(20) , 
); 

insert into users values('riyan@gmail.com','123','farmer');

insert into farmer values (1,'Rao Muhammad Riyan',03214345643,'riyan@gmail.com','304 B Multan','Multan','Punjab','Pakistan',5321)

go
create procedure LoginValidation @e varchar(50) , @p varchar(20) , @status int output 
as 
begin 
	if(select COUNT(*) from users where email = @e AND password = @p ) = 1
		SET @status = 1 ; 
	else
		SET @status = 0 ; 	
end 
go
--drop procedure LoginValidation
declare @status int 
exec LoginValidation @e = 'riyan@gmail.com' ,@p = '123',@status=@status output
select @status

insert into crop values (1,'Tomatoes','Roma','2022-03-01','2022-05-31',100,90,'kg',1)
INSERT INTO irrigation (id, date, type, amount, crop_id) 
VALUES 
(1, '2023-04-30', 'Sprinkler', 100, 1)

INSERT INTO pest_management (id, date, type, chemical_used, crop_id) VALUES
(1, '2022-01-01', 'Fungus', 'Chemical A', 1)

INSERT INTO financial_management (id, date, type, amount, crop_id) VALUES
(1, '2023-04-29', 'Income', 5000, 1)


INSERT INTO inventory_management (id, name, quantity, unit_of_measure, crop_id) VALUES (1, 'Fertilizer', 100, 'kg', 1);

go
create function retrieveUserData (@email varchar(50)) 
returns table 
as 
return 
select u.email , u.role , f.id as farmerID , f.name , f.phone  , f.address , f.city , f.state , f.country , f.postal_code , c.id , c.name as CropName , c.variety , c.planted_date 
, c.harvested_date , c.expected_yield , c.actual_yield , c.unit_of_measure , ir.id as IrrigationID , ir.date as IrrigationDate , ir.type , ir.amount , ir.crop_id as CropID , pm.id as PestID , pm.type as Pest_Type , pm.date , pm.chemical_used , 
fm.id as FinancialID, fm.date as financeData , fm.type as IncomeType , fm.amount as financeAmount
from users u 
join farmer f on f.email = u.email AND u.email = @email
join crop c on c.farmer_id = f.id 
join irrigation ir on ir.crop_id = c.id 
join pest_management pm on pm.crop_id = c.id 
join financial_management fm on fm.crop_id = c.id 
go

select * from retrieveUserData('riyan@gmail.com')

select * from users 
select * from farmer
select * from crop 
select * from irrigation 
select * from pest_management 
select * from financial_management 

