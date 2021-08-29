DROP DATABASE IF EXISTS givn_dev;

CREATE DATABASE givn_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email TEXT NOT NULL,
    display_name VARCHAR(20),
    address VARCHAR(100)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    user_id INT REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE photos (
    photo TEXT NOT NULL,
    post_id INT REFERENCES posts (id) ON DELETE CASCADE
)