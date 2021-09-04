const db = require('../db/dbConfig');

const getAllPhotos = async (item_id) => await db.any('SELECT photo_url FROM photos where item_id = $1', item_id);

module.exports = {getAllPhotos}