DROP DATABASE IF EXISTS givn_dev;

CREATE DATABASE givn_dev;

\c givn_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(50),
    display_name VARCHAR(40),
    address VARCHAR(100),
    score INT DEFAULT 0,
    uid VARCHAR(30) UNIQUE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TEXT NOT NULL,
    status TEXT NOT NULL,
    is_biodegradable BOOLEAN DEFAULT FALSE,
    expiration INT DEFAULT 0,
    giver_id VARCHAR(30) REFERENCES users (uid) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    time TEXT NOT NULL,
    getter_id VARCHAR(30) REFERENCES users (uid),
    giver_id VARCHAR(30) REFERENCES users (uid),
    item_id INT REFERENCES items (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    points INT NOT NULL
);
CREATE TABLE category_items (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories (id),
    item_id INT REFERENCES items (id)
);

CREATE TABLE photos (
    photo_url TEXT NOT NULL,
    item_id INT REFERENCES items (id) ON DELETE CASCADE
);