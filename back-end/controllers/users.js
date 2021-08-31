const users = require('express').Router();
const { getUser, getAllUsers, createUser, deleteUser } = require('../queries/users')

users.get('/', async (req, res) => res.json(await getAllUsers()))

users.get('/:id', async (req, res) =>{
    const user = await getUser(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({success: false, error: true, message: "invaid id"})
    }
})

users.post('/', async(req,res)=> req.body.email ? res.json(await createUser(req.body)) : res.status(422).json({success: false, error: true, message: "email is required"}))

users.delete('/:id', async (req, res) => {
    const user = await deleteUser(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({success: false, error: true, message: "invaid id"})
    }
})

module.exports = users;