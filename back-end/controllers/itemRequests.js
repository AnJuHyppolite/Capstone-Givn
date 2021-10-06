const requests = require('express').Router({
    mergeParams: true
});
const { getAllRequests, postRequest, updateRequest, closeRequests } = require('../queries/itemRequests')

requests.get('/', async (req, res) => {
    return res.json(await getAllRequests(req.params.item_id))
})

requests.post('/', async (req, res) => {
    if (req.body) {
        res.json(await postRequest(req.body))
    } else {
        res.status(422).json({ success: false, error: true, message: "request already made" })
    }
})

requests.put('/:id', async (req, res) => {
    console.log(req.body)
    const {id} = req.params;
    const updatedRequest = await updateRequest(req.body, id);
    updatedRequest ? res.json(updatedRequest) : res.status(422).json({success: false, error: true, message: "invalid id"})
})

requests.put('/:id/close', async (req, res) => {
    const {id} = req.params;
    const updatedRequest = await closeRequests(id);
    updatedRequest ? res.json(updatedRequest) : res.status(422).json({success: false, error: true, message: "invalid id"})
})

module.exports = requests;