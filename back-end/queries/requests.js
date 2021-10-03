const db = require('../db/dbConfig');

const getAllRequests = async (item_id) => await db.any('SELECT * FROM requests where item_id = $1', item_id);

const postRequest = async(newRequest) => {
    const {status, getter_id, giver_id, item_id} = newRequest 
    return await db.oneOrNone('INSERT INTO requests(status, getter_id, giver_id, item_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [status, getter_id, giver_id, item_id]);
}

const updateRequest = async(newRequest, id) => {
    const {status} = newRequest 
    return await db.oneOrNone('UPDATE requests SET status = $1  WHERE id = $2 RETURNING *',
        [status, id]);
}

module.exports = {getAllRequests, postRequest, updateRequest}