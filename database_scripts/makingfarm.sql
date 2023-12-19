set @result_id = 0;
set @address_id = 0;
-- CALL MakeAddress(7, "Wheat Farms, Khushbab, Punjab", "Khushbab", @address_id);
-- CALL MakeFarm(32.581111, 72.213888, 7, 1, "Wheat Farms", 2, @result_id);
call agro_db.MakeCompleteFarm(32.581111, 72.213888, 1, 'Wheat Farms', 2, 8, 'Wheat Farms, Khushbab, Punjab', 'Khushbab', @result_id);
select @result_id;
