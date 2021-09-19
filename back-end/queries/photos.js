const db = require('../db/dbConfig');

const getAllPhotos = async (item_id) => await db.any('SELECT photo_url FROM photos where item_id = $1', item_id);

const postPhoto = async(photo_url, item_id) => {
    return await db.oneOrNone('INSERT INTO photos(photo_url, item_id) VALUES ($1, $2) RETURNING *',
        [photo_url, item_id]);
}

module.exports = {getAllPhotos, postPhoto}