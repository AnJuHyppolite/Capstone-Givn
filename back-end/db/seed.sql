\c givn_dev;

INSERT INTO users(email, display_name, address, longitude, latitude, photo_url, uid) VALUES
('firstuser@gmail.com', 'initial tester', 'Jamaica, New York City, New York 11435, United States',-73.7937,40.6935,'https://i.imgur.com/1ROVCKE.jpeg','F8j9j'),
('masterjeff@yahoo.com' , 'master Jeff', '',0,0,'https://i.imgur.com/8wztbO7.jpeg','f23r234'),
('heyyall@gmail.com', 'heeeeey', '53 Flushing Avenue, Queens, New York 11206, United States',-73.914239,40.714417,'https://i.imgur.com/F9Nf9Fx.jpeg','f234'),
('johndoe15@hotmail.com', 'johnnyboy','Manhattanville, New York City, New York 10027, United States',0,0,'https://i.imgur.com/1Ls3uvI.jpeg','f322f23'),
('ShoaibDar@pursuit.org','Shoaib','110-14 64th Avenue, Queens, New York 11374, United States',-73.845264,40.734233,'https://i.imgur.com/wI7ivU7.png','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2');

INSERT INTO items(title, description, address, longitude, latitude, created_at, status, is_biodegradable, expiration, giver_id) VALUES 
('wine rack', '6-bottle holder', 'City Place Grill, 10223 Horace Harding Expy, New York City, New York 11368, United States', -73.855659, 40.737068, '8/19/21 6PM', 'active', false, 0, 'F8j9j'),
('bar stools', 'wooden', 'Pursuit, 47-10 Austell Pl Fl 3, Long Island City, New York 11101, United States', -73.941871, 40.743036, '8:19 p.m.', 'active', false, 0, 'f234'),
('nutella', 'unopened',  '110-14 64th Avenue, Queens, New York 11374, United States', -73.845264, 40.734233, 'Sat Sep 25 2021', 'active', true, 22, 'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2');

INSERT INTO transactions(time, getter_id, giver_id, item_id) VALUES 
('8:06 pm', 'F8j9j', 'f23r234', 2), ('2:06 am', 'f23r234', 'F8j9j', 2), 
('8:06 pm', 'F8j9j', 'f23r234', 3),('12:01 pm', 'CVAp4aL1tLTTo7wB8Tn6BMfpI2X2', 'f23r234', 3),
('12:03 pm', 'f23r234','CVAp4aL1tLTTo7wB8Tn6BMfpI2X2',3);

INSERT INTO categories(name, points) VALUES 
('Electronics', 60),('Clothes', 40),('Food', 30),('Shoes', 50),('Toys', 60),('Books', 30),
('Hardware', 60),('Kitchenware', 40),('Furniture', 70),('Jewelry', 80),('Arts & Crafts', 30),
('Sports & Outdoors', 50),('Beauty & Health', 40), ('Other',30);

INSERT INTO category_items(category_id, item_id) VALUES 
(6,1), (4,2), (1,3);

INSERT INTO photos(photo_url, item_id) VALUES 
('https://dummyimage.com/300.png/09f/fff', 2), ('https://dummyimage.com/300.png/09f/aa1', 2), ('https://dummyimage.com/300.png/aaf/fff', 1);