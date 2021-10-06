const db = require('../db/dbConfig');

const getAllItems = async (user_id) => await db.any('SELECT * FROM items WHERE giver_id = $1', user_id);

const getItem = async (id) => await db.oneOrNone('SELECT * FROM items WHERE id=$1', id);

const createItem = async (user_id, item) => {
    let { title, description, address, longitude, latitude, created_at, status, category, is_biodegradable, expiration } = item;
    if(!category) category = 'Other';
    return await db.oneOrNone('INSERT INTO items(title, description, address, longitude, latitude, created_at, status, category, is_biodegradable, expiration, giver_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [title, description, address, longitude, latitude, created_at, status, category, is_biodegradable, expiration, user_id]);
}

const deleteItem = async (id) => await db.oneOrNone('DELETE FROM items WHERE id=$1 RETURNING *', id)

const updateItem = async (id, item) => {
    const { title, description, address, longitude, latitude, status, category, is_biodegradable, expiration } = item;
    return db.oneOrNone("UPDATE items SET title = $1, description = $2, address = $3, longitude = $4, latitude = $5, status = $6, category = $7, is_biodegradable = $8, expiration = $9 WHERE id = $10 RETURNING *",
        [title, description, address, longitude, latitude, status, category, is_biodegradable, expiration, id]);
}


module.exports = { getAllItems, getItem, createItem, deleteItem, updateItem }