
const express = require('express')
const server = express()
const router = express.Router()
const ProductController = require('../controllers/productController')

server.get('/', ProductController.index)
server.get('/:id', ProductController.addProduct)


module.exports = router