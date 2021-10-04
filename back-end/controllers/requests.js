const requests = require('express').Router();
const { getMyRequests, getAllRequests } = require('../queries/requests')

requests.get('/', async (req, res) => res.json(await getAllRequests()))

requests.get('/:user_id', async (req, res) => {
   return res.json(await getMyRequests(req.params.user_id))
})

module.exports = requests;