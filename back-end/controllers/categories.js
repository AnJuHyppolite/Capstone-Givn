const categories = require('express').Router();
const { getAllCategories} = require('../queries/categories')

categories.get('/', async (req, res) => res.json(await getAllCategories()))

module.exports = categories