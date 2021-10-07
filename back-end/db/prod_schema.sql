
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS requests CASCADE;

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
    category VARCHAR(30) NOT NULL,
    is_biodegradable BOOLEAN DEFAULT FALSE,
    expiration INT DEFAULT 0,
    giver_id VARCHAR(30) REFERENCES users (uid) ON DELETE CASCADE
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    time TEXT NOT NULL,
    points INT DEFAULT 50,
    getter_id VARCHAR(30) REFERENCES users (uid),
    giver_id VARCHAR(30) REFERENCES users (uid),
    item_id INT REFERENCES items (id)
);

CREATE TABLE photos (
    photo_url TEXT NOT NULL,
    item_id INT REFERENCES items (id) ON DELETE CASCADE
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    status TEXT,
    display_name VARCHAR(40) NOT NULL,
    title VARCHAR(50) NOT NULL,
    getter_id VARCHAR(30) REFERENCES users (uid),
    giver_id VARCHAR(30) REFERENCES users (uid),
    item_id INT REFERENCES items (id) ON DELETE CASCADE
)