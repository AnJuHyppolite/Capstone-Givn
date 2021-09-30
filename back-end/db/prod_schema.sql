-- \c production_database_name;

-- DROP TABLE IF EXISTS test;

-- CREATE TABLE test (
--     id SERIAL PRIMARY KEY, 
--     name TEXT
-- );

-- DROP DATABASE IF EXISTS givn_dev;

-- CREATE DATABASE givn_dev;

-- \c givn_dev;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS category_items;
DROP TABLE IF EXISTS photos;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(40),
    display_name VARCHAR(40),
    address text,
    longitude DECIMAL DEFAULT 0,
    latitude DECIMAL DEFAULT 0,
    score INT DEFAULT 0,
    photo_url TEXT,
    uid VARCHAR(30) UNIQUE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
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