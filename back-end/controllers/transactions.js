const transactions = require('express').Router({
    mergeParams: true
});
const { getAllTransactions, postTransaction} = require('../queries/transactions')

transactions.get('/', async (req, res) => {
    console.log(req.params)
   return res.json(await getAllTransactions(req.params.user_id))
})

transactions.post('/', async (req, res) => {
    console.log("INSIDE TRANSACTIONS CONTROLLER>>> ")
    if (req.body) {
        res.json(await postTransaction(req.body))
    } else {
        res.status(422).json({ success: false, error: true, message: "request already made" })
    }

})

module.exports = transactions;