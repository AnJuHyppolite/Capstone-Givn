const items = require('express').Router();
const { getAllItems, getItem, deleteItem, createItem, updateItem } = require('../queries/items')
const photosController = require('./photos')

items.use("/:item_id/photos", photosController);

items.get('/', async (req, res) => res.json(await getAllItems()))

items.get('/:id', async (req, res) =>{
    const item = await getItem(req.params.id)
    if(item){
        res.json(item)
    }else{
        res.status(404).json({success: false, error: true, message: "invaid id"})
    }
})

items.post('/', async(req,res)=> req.body.title && req.body.description && req.body.address && req.body.status ? res.json(await createItem(req.body)) : res.status(422).json({success: false, error: true, message: "title is required"}))

items.delete('/:id', async (req, res) => {
    const item = await deleteItem(req.params.id)
    if(item){
        res.json(item)
    }else{
        res.status(404).json({success: false, error: true, message: "invaid id"})
    }
})

items.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const item = req.body;
    const editedItem = await updateItem(id, item);
    editedItem ? res.json(editedItem) : res.status(422).json({success: false, error: true, message: "invalid id"})
})




module.exports = items;