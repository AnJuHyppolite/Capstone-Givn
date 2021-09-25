const db = require('../db/dbConfig');

const getAllUsers = async () => await db.any('SELECT * FROM users');

const getUser = async (id) => {
    return await db.oneOrNone('SELECT * FROM users WHERE uid=$1', id);
}

const createUser = async (user) => {
    let { email, display_name, address, uid } = user;
    if (!display_name) display_name = email || "unknown user"
    if (!address) address = "EARTH";
    return await db.oneOrNone('INSERT INTO users(email, display_name, address, uid) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, display_name, address, uid]);
}

const deleteUser = async (id) => await db.oneOrNone('DELETE FROM users WHERE id=$1 RETURNING *', id)

const updateUser = async (id, user) => {
    const { display_name, email, address, longitude, latitude } = user;
    return db.oneOrNone("UPDATE users SET display_name = $1, email = $2, address = $3, longitude = $4, latitude = $5 where uid = $6 RETURNING *",
        [display_name, email, address, longitude, latitude, id]);
}

module.exports = { getUser, getAllUsers, createUser, deleteUser, updateUser };