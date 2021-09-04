const photos = require('express').Router({
    mergeParams: true
});

const { getAllPhotos } = require('../queries/photos')

photos.get('/', async (req, res) => res.json(await getAllPhotos(req.params.item_id)))

module.exports = photos