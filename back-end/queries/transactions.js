const db = require('../db/dbConfig');

const getAllTransactions = async (user_id) => await db.any('SELECT * FROM transactions where giver_id = $1 OR getter_id = $1',
[user_id]);

const postTransaction = async (newTransaction) => {
    const { time, getter_id, points, giver_id, item_id } = newTransaction
    return await db.oneOrNone('INSERT INTO transactions(time, points, getter_id, giver_id, item_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [time, points, getter_id, giver_id, item_id]);
}


module.exports = {getAllTransactions, postTransaction} 