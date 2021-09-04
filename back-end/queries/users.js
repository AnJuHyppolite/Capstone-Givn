const db = require('../db/dbConfig');

const getAllUsers = async () => await db.any('SELECT * FROM users');

const getUser = async (id) => await db.oneOrNone('SELECT * FROM users WHERE id=$1', id);

const createUser = async (user) => {
    let { email, display_name, address } = user;
    if (!display_name) display_name = email;
    if (!address) address = "EARTH";
    return await db.oneOrNone('INSERT INTO users(email, display_name, address) VALUES ($1, $2, $3) RETURNING *',
        [email, display_name, address]);
}

const deleteUser = async (id) => await db.oneOrNone('DELETE FROM users WHERE id=$1 RETURNING *', id)

const updateUser = async (id, user) => {
    const { display_name, address } = user;
    return db.oneOrNone("UPDATE users SET display_name = $1, address = $2 where id = $3 RETURNING *", [display_name, address, id]);
}

module.exports = { getUser, getAllUsers, createUser, deleteUser, updateUser };