const db = require('../db/dbConfig');

const getAllTransactions = async (user_id) => await db.any('SELECT * FROM transactions where giver_id = $1 OR getter_id = $1',
[user_id]);


module.exports = {getAllTransactions} 