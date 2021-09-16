\c givn_dev;

INSERT INTO users(email, display_name, address, uid) VALUES
('testemail1@gmail.com', 'initial tester', 'New York','F8j9j'),
('masterjeff@yahoo.com' , 'master Jeff', 'queens','f23r234'),
('heyyall@gmail.com', 'heeeeey', 'Bronx','f234'),
('johndoe15@hotmail.com', 'johnnyboy', 'Jersey City, NJ','f322f23'),
('ShoaibDar@pursuit.org','Shoaib','Queens Ny','5ZjX8DrGQEMcnzMVOz6vT7utm6q2');

INSERT INTO items(title, description, location, created_at, status, is_biodegradable, expiration, giver_id) VALUES 
('wine rack', '6-bottle holder', 'New York', '8/19/21 6PM', 'active', false, 0, 1),
('bar stools', 'wooden', 'Bronx', '8:19 p.m.', 'active', false, 0, 3),
('nutella', 'unopened', 'Jersey City', '11:34 a.m', 'active', true, 22,2);

INSERT INTO transactions(time, getter_id, giver_id, item_id) VALUES 
('8:06 pm', 'F8j9j', 'f23r234', 2), ('2:06 am', 'f23r234', 'F8j9j', 2), 
('8:06 pm', 'F8j9j', 'f23r234', 3),('12:01 pm', '5ZjX8DrGQEMcnzMVOz6vT7utm6q2', 'f23r234', 3),
('12:03 pm', 'f23r234','5ZjX8DrGQEMcnzMVOz6vT7utm6q2',3);

INSERT INTO categories(name, points) VALUES 
('food', 30),('clothes', 40),('electronics', 60),('books', 30),('hardware', 50),('shoes', 40),('furniture', 50);

INSERT INTO category_items(category_id, item_id) VALUES 
(6,1), (4,2), (1,3);

INSERT INTO photos(photo_url, item_id) VALUES 
('https://dummyimage.com/300.png/09f/fff', 2), ('https://dummyimage.com/300.png/09f/aa1', 2), ('https://dummyimage.com/300.png/aaf/fff', 1);