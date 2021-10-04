const db = require('../db/dbConfig');

const getAllRequests = async (item_id) => await db.any('SELECT * FROM requests where item_id = $1', item_id);

const postRequest = async (newRequest) => {
    const { status, display_name, title, getter_id, giver_id, item_id } = newRequest
    let data = await db.any('SELECT * FROM requests where getter_id = $1 AND item_id = $2', [getter_id, item_id])
    if (data.length > 0) {
        console.log("request already made")
        return null;
    }
    return await db.oneOrNone('INSERT INTO requests(status, display_name, title, getter_id, giver_id, item_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [status, display_name, title, getter_id, giver_id, item_id]);
}

const updateRequest = async (newRequest, id) => {
    const { status } = newRequest
    console.log("INSIDER Request controller > updateRequest: ")
    return await db.oneOrNone('UPDATE requests SET status = $1  WHERE id = $2 RETURNING *',
        [status, id]);
}

const closeRequests = async (id) => {
    console.log("INSIDE CloseRequest quries: ")
    return await db.any('UPDATE requests SET status = $1 WHERE item_id = $2 RETURNING *', ['inactive',id]);

}

module.exports = { getAllRequests, postRequest, updateRequest, closeRequests }