const users = require('express').Router();
const { getUser, getAllUsers, createUser, deleteUser, updateUser } = require('../queries/users')
const itemsForUserController = require('./itemsForUser')

users.use("/:user_id/items", itemsForUserController);

users.get('/', async (req, res) => res.json(await getAllUsers()))

users.get('/:id', async (req, res) =>{
    console.log(req.params)
    const user = await getUser(req.params.id)
    console.log(user)
    if(user){
        res.json(user)
    }else{
        res.json({success: false, error: true, message: "invaid id"})
    }
})

users.post('/', async(req,res)=> {
    console.log(req.body)
    req.body.email ? res.json(await createUser(req.body)) : res.status(422).json({success: false, error: true, message: "email is required"})
})

users.delete('/:id', async (req, res) => {
    const user = await deleteUser(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({success: false, error: true, message: "invaid id"})
    }
})

users.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const user = req.body;
    const editedUser = await updateUser(id, user);
    editedUser ? res.json(editedUser) : res.status(422).json({success: false, error: true, message: "invalid id"})
})

module.exports = users;