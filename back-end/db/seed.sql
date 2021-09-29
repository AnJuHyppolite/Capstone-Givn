\c givn_dev;

INSERT INTO users(email, display_name, address, longitude, latitude, photo_url, uid) VALUES
('firstuser@gmail.com', 'initial tester', 'Jamaica, New York City, New York 11435, United States',-73.7937,40.6935,'https://i.imgur.com/1ROVCKE.jpeg','F8j9j'),
('masterjeff@yahoo.com' , 'master Jeff', '31 Cooper Square, New York City, New York 10003, United States',-73.991005,40.728062,'https://i.imgur.com/8wztbO7.jpeg','f23r234'),
('heyyall@gmail.com', 'heeeeey', '53 Flushing Avenue, Queens, New York 11206, United States',-73.914239,40.714417,'https://i.imgur.com/F9Nf9Fx.jpeg','f234'),
('johndoe15@hotmail.com', 'johnnyboy','Flatlands 1st Street, Brooklyn, New York 11236, United States',-73.891212,40.6462201,'https://i.imgur.com/1Ls3uvI.jpeg','f322f23'),
('ShoaibDar@pursuit.org','Shoaib','110-14 64th Avenue, Queens, New York 11374, United States',-73.845264,40.734233,'https://i.imgur.com/wI7ivU7.png','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('kkoreancafe@yahoo.com', 'liz the artist','1661 Watson Avenue, The Bronx, New York 10472, United States',-73.871752, 40.827299,'https://i.imgur.com/R5NiUHw.jpeg','f0013'),
('oldguy@gmail.com','almost-homeless man', '42 Springhouse Road, Woodcliff Lake, New Jersey 07677, United States',-74.073238,41.017045,'https://i.imgur.com/LbDUJDk.jpeg','f67yo'),
('glasses@gmail.com','Tony kadurk', 'Madison Avenue Baptist Church, 30 E 31st St, New York City, New York 10016, United States',-73.983094,40.744777,'https://i.imgur.com/o9fpo46.png','f42yo'),
('sleepygirl@gmail.com', 'Lisa Ngeyen','8205 Gilbert Street, Philadelphia, Pennsylvania 19150, United States',-75.173898,40.07367,'https://i.imgur.com/1Ls3uvI.jpeg','fsl32'),
('mysteryhat@gmail.com', 'thomas kagat','Halsey Street, Brooklyn, New York 11233, United States', -73.9282693182089,40.6844701,'https://i.imgur.com/0D3B2ax.png','fmh21'),
('suitman@yahoo.com','Jack Huston','Happy Lamb Hot Pot, 136-59 37th Ave, New York City, New York 11354, United States',-73.828963,40.762083,'https://i.imgur.com/Et8CwjS.jpeg','fm45');

INSERT INTO items(title, description, address, longitude, latitude, created_at, status, is_biodegradable, expiration, giver_id) VALUES 
('wine rack', '6-bottle holder', 'City Place Grill, 10223 Horace Harding Expy, New York City, New York 11368, United States', -73.855659, 40.737068, '9/27/2021 11:30', 'active', false, 0, 'F8j9j'),
('bar stools', 'wooden', 'Pursuit, 47-10 Austell Pl Fl 3, Long Island City, New York 11101, United States', -73.941871, 40.743036, '9/14/2021 1:30', 'active', false, 0, 'f234'),
('nutella', 'unopened',  '110-14 64th Avenue, Queens, New York 11374, United States', -73.845264, 40.734233, '9/26/2021 21:30', 'active', true, 22, 'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('Old Table', 'sturdy dining table, 35'' by 47''','1661 Watson Avenue, The Bronx, New York 10472, United States',-73.871752, 40.827299,'8/23/2021 3:10','active',false, 0,'f0013'),
('Reclining Couch', 'Used leather reclining couch/loveseat. Still usable.','Forest Hills Public Library, 108-19 71st Ave, Forest Hls, New York 11375, United States',-73.843002,40.722092,'7/7/2021 7:10','inactive',false,0,'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('Canned Chick Peas', 'Eden Foods Garbanzo Beans (Chick Peas) Organic, unopened','Forest Hills Public Library, 108-19 71st Ave, Forest Hls, New York 11375, United States',-73.843002,40.722092,'6/4/2021 1:11','inactive',true,89,'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('H&M Crew Neck Sweater','H&M OVERSIZED SWEATER SZ M CREW NEXK SWEATER. Used. Big and comfortable','8205 Gilbert Street, Philadelphia, Pennsylvania 19150, United States',-75.173898,40.07367,'7/20/2021 8:20', 'active',false, 0, 'fsl32'),
('Dell Keyboard', 'Dell KB216-BK-US Wired Keyboard Standard - Black USB 06WMN0. Mildly used',  '110-14 64th Avenue, Queens, New York 11374, United States', -73.845264, 40.734233, '9/17/2021 12:43', 'active', false, 0, 'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('Men''s Magellan Outdoor Jeans','Men''s Magellan Jeans Outdoors Straight Leg Blue Jeans / Men’s Size 34 x 30','42 Springhouse Road, Woodcliff Lake, New Jersey 07677, United States',-74.073238,41.017045,'9/1/2021 10:00', 'active',false, 0,'f67yo'),
('Straw Woven Dinner Mats','2 Natural Straw Oval Woven Kitchen Dinner Mats Placemat Tablemats 11.5" X 8.5"','1661 Watson Avenue, The Bronx, New York 10472, United States',-73.871752, 40.827299,'9/9/2021 12:55','active',false,0,'f0013'),
('SAT prep book (mometrix)','SAT Prep Book: SAT Secrets Study Guide: Complete Review, Practice Tests with videos!','Happy Lamb Hot Pot, 136-59 37th Ave, New York City, New York 11354, United States',-73.828963,40.762083,'9/25/2021 13:31','active',false,0,'fm45');

INSERT INTO transactions(time, getter_id, giver_id, item_id) VALUES 
('7/21/2021 7:10', 'f67yo','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2',5),
('7/14/2021 3:10', 'f42yo','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2',6);

INSERT INTO categories(name, points) VALUES 
('Electronics', 60),('Clothes', 40),('Food', 30),
('Shoes', 50),('Toys', 60),('Books', 30),
('Hardware', 60),('Kitchenware', 40),('Furniture', 70),
('Jewelry', 80),('Arts & Crafts', 30),('Sports & Outdoors', 50),
('Beauty & Health', 40), ('Other',30);

INSERT INTO category_items(category_id, item_id) VALUES 
(8,1), (9,2), (3,3),(9,4),(9,5),(3,6),(2,7),(1,8),(2,9),(8,10),(6,11);

INSERT INTO photos(photo_url, item_id) VALUES 
('https://m.media-amazon.com/images/I/81qT6I2UYzL._AC_SX679_.jpg', 1),
('https://i.ebayimg.com/images/g/g~gAAOSwLSJhBnUA/s-l500.jpg', 2),
('https://i.ebayimg.com/images/g/u~wAAOSwLWVhBnUC/s-l500.jpg', 2),
('https://media.istockphoto.com/photos/nutella-picture-id514211861?k=20&m=514211861&s=612x612&w=0&h=P-J-EIgExKsaoDxOgv1X3vRiy-EIFadvu95oMrPNmOk=', 3),
 ('https://i.ebayimg.com/images/g/0twAAOSwHSRhQmig/s-l500.jpg', 4),
 ('https://i.ebayimg.com/images/g/gsgAAOSwpbFhQmii/s-l500.jpg', 4),
 ('https://i.ebayimg.com/images/g/Eu0AAOSwLf9gcJfX/s-l500.jpg', 5),
('https://i.ebayimg.com/images/g/yJQAAOSwal9gcJff/s-l500.jpg',5),
('https://i.ebayimg.com/images/g/aBAAAOSw8ZhdVjHc/s-l500.png',6),
('https://i.ebayimg.com/images/g/T5MAAOSwNk1hT-KW/s-l500.jpg',7),
('https://i.ebayimg.com/images/g/1DkAAOSwf89hT-Kh/s-l500.jpg',7),
('https://i.ebayimg.com/images/g/QIcAAOSwCNJfKrXT/s-l500.jpg',8),
('https://i.ebayimg.com/images/g/QnsAAOSwl3JhIgiC/s-l500.jpg',9),
('https://i.ebayimg.com/images/g/kzcAAOSwe~Jffc~w/s-l500.jpg',10),
('https://i.ebayimg.com/images/g/cbAAAOSwxklffc~1/s-l500.jpg',10),
('https://i.ebayimg.com/images/g/WtwAAOSwo4pffc~~/s-l500.jpg',10),
('https://i.ebayimg.com/images/g/krYAAOSwdPBZydfv/s-l500.jpg',11);