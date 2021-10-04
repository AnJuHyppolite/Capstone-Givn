const db = require('../db/dbConfig');

const getMyRequests = async (user_id) => await db.any('SELECT * FROM requests where giver_id = $1 OR getter_id = $1',
[user_id]);

 const getAllRequests = async () => await db.any('SELECT * FROM requests');

module.exports = {getMyRequests, getAllRequests}