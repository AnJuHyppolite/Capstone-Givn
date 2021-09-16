const transactions = require('express').Router({
    mergeParams: true
});
const { getAllTransactions} = require('../queries/transactions')

transactions.get('/', async (req, res) => {
    console.log(req.params)
   return res.json(await getAllTransactions(req.params.user_id))

})

module.exports = transactions;