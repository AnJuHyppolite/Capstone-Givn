const users = require('express').Router();
const { getUser, getAllUsers, createUser, deleteUser, updateUser } = require('../queries/users')
const itemsForUserController = require('./itemsForUser')
const transactionsController = require('./transactions')

users.use("/:user_id/items", itemsForUserController);
users.use("/:user_id/transactions", transactionsController)

users.get('/', async (req, res) => res.json(await getAllUsers()))

users.get('/:id', async (req, res) =>{
    const user = await getUser(req.params.id)
    if(user){
        res.json(user)
    }else{
       res.json({success: false, error: true, message: "invalid id"})
    }
})

users.post('/', async(req,res)=> {
    console.log(req.body)
    req.body.uid ? res.json(await createUser(req.body)) : res.status(422).json({success: false, error: true, message: "email is required"})
})

users.delete('/:id', async (req, res) => {
    const user = await deleteUser(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({success: false, error: true, message: "invalid id"})
    }
})

users.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const user = req.body;
    console.log("INSIDE USERS controller")
    console.log(user)
    const editedUser = await updateUser(id, user);
    editedUser ? res.json(editedUser) : res.status(422).json({success: false, error: true, message: "invalid id"})
})

module.exports = users;