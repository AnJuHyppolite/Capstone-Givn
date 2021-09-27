\c givn_dev;

INSERT INTO users(email, display_name, address, longitude, latitude, photo_url, uid) VALUES
('firstuser@gmail.com', 'initial tester', 'Jamaica, New York City, New York 11435, United States',-73.7937,40.6935,'https://i.imgur.com/1ROVCKE.jpeg','F8j9j'),
('masterjeff@yahoo.com' , 'master Jeff', '31 Cooper Square, New York City, New York 10003, United States',-73.991005,40.728062,'https://i.imgur.com/8wztbO7.jpeg','f23r234'),
('heyyall@gmail.com', 'heeeeey', '53 Flushing Avenue, Queens, New York 11206, United States',-73.914239,40.714417,'https://i.imgur.com/F9Nf9Fx.jpeg','f234'),
('johndoe15@hotmail.com', 'johnnyboy','Flatlands 1st Street, Brooklyn, New York 11236, United States',-73.891212,40.6462201,'https://i.imgur.com/1Ls3uvI.jpeg','f322f23'),
('ShoaibDar@pursuit.org','Shoaib','110-14 64th Avenue, Queens, New York 11374, United States',-73.845264,40.734233,'https://i.imgur.com/wI7ivU7.png','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('kkoreancafe@yahoo.com', 'liz the artist','1661 Watson Avenue, The Bronx, New York 10472, United States',-73.871752, 40.827299,'https://i.imgur.com/R5NiUHw.jpeg','f0013'),
('oldguy@gmail.com','almost-homeless man', '42 Springhouse Road, Woodcliff Lake, New Jersey 07677, United States',-74.073238,41.017045,'https://i.imgur.com/LbDUJDk.jpeg','f67yo');

INSERT INTO items(title, description, address, longitude, latitude, created_at, status, is_biodegradable, expiration, giver_id) VALUES 
('wine rack', '6-bottle holder', 'City Place Grill, 10223 Horace Harding Expy, New York City, New York 11368, United States', -73.855659, 40.737068, '9/27/2021 11:30', 'active', false, 0, 'F8j9j'),
('bar stools', 'wooden', 'Pursuit, 47-10 Austell Pl Fl 3, Long Island City, New York 11101, United States', -73.941871, 40.743036, '9/14/2021 1:30', 'active', false, 0, 'f234'),
('nutella', 'unopened',  '110-14 64th Avenue, Queens, New York 11374, United States', -73.845264, 40.734233, '9/26/2021 21:30', 'active', true, 22, 'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2'),
('Old Table', 'sturdy dining table, 35'' by 47''','1661 Watson Avenue, The Bronx, New York 10472, United States',-73.871752, 40.827299,'8/23/2021 3:10','active',false, 0,'f0013'),
('Reclining Couch', 'Used leather reclining couch/loveseat. Still usable.','Forest Hills Public Library, 108-19 71st Ave, Forest Hls, New York 11375, United States',-73.843002,40.722092,'7/7/2021 7:10','inactive',false,0,'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2');

INSERT INTO transactions(time, getter_id, giver_id, item_id) VALUES 
('7/21/2021 7:10', 'f67yo','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2',5);

INSERT INTO categories(name, points) VALUES 
('Electronics', 60),('Clothes', 40),('Food', 30),('Shoes', 50),('Toys', 60),('Books', 30),
('Hardware', 60),('Kitchenware', 40),('Furniture', 70),('Jewelry', 80),('Arts & Crafts', 30),
('Sports & Outdoors', 50),('Beauty & Health', 40), ('Other',30);

INSERT INTO category_items(category_id, item_id) VALUES 
(6,1), (4,2), (1,3);

INSERT INTO photos(photo_url, item_id) VALUES 
('https://m.media-amazon.com/images/I/81qT6I2UYzL._AC_SX679_.jpg', 1),
('https://i.ebayimg.com/images/g/g~gAAOSwLSJhBnUA/s-l500.jpg', 2),
('https://i.ebayimg.com/images/g/u~wAAOSwLWVhBnUC/s-l500.jpg', 2),
 ('https://i.ebayimg.com/images/g/0twAAOSwHSRhQmig/s-l500.jpg', 4),
 ('https://i.ebayimg.com/images/g/gsgAAOSwpbFhQmii/s-l500.jpg', 4),
 ('https://i.ebayimg.com/images/g/Eu0AAOSwLf9gcJfX/s-l500.jpg', 5),
('https://i.ebayimg.com/images/g/yJQAAOSwal9gcJff/s-l500.jpg',5);