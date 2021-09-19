const db = require('../db/dbConfig');

const getAllCategories = async () => await db.any('SELECT * FROM categories');

module.exports = {getAllCategories}