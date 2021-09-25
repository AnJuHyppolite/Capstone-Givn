const itemsForUser = require('express').Router({
    mergeParams: true
});
const { getAllItems, getItem, createItem, deleteItem, updateItem } = require('../queries/itemsForUser')

itemsForUser.get('/', async (req, res) => res.json(await getAllItems(req.params.user_id)))

itemsForUser.get('/:id', async (req, res) => {
    const item = await getItem(req.params.id)
    if (item) {
        res.json(item)
    } else {
        res.status(404).json({ success: false, error: true, message: "invaid id" })
    }
})

itemsForUser.post('/', async (req, res) => {
    if (req.body.title && req.body.description && req.body.address && req.body.status) {
        let postedItem = await createItem(req.params.user_id, req.body)
        console.log(postedItem)
        res.json(postedItem)
    }
    else {
        res.status(422).json({ success: false, error: true, message: "title is required" })
    }
})

itemsForUser.delete('/:id', async (req, res) => {
    const item = await deleteItem(req.params.id)
    if (item) {
        res.json(item)
    } else {
        res.status(404).json({ success: false, error: true, message: "invaid id" })
    }
})

itemsForUser.put('/:id', async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    const editedItem = await updateItem(id, item);
    editedItem ? res.json(editedItem) : res.status(422).json({ success: false, error: true, message: "invalid id" })
})


module.exports = itemsForUser