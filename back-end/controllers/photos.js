const photos = require('express').Router({
    mergeParams: true
});

const { getAllPhotos, postPhoto } = require('../queries/photos')

photos.get('/', async (req, res) => res.json(await getAllPhotos(req.params.item_id)))

photos.post('/', async (req, res) => {
    if (req.body) {
        res.json(await postPhoto(req.body.photo_url, req.params.item_id))
    }else{
        res.status(422).json({ success: false, error: true, message: "email is required" })
    }

})

module.exports = photos