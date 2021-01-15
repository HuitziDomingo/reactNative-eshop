const express = require('express')
const router = express.Router()
const { Product } = require('../models/Products')


router.get('/', async (req, res) => {
    let productList = await Product.find()
    if (!productList) res.send(500).json({ success: false })
    res.send(productList)
})
router.post('/', (req, res) => {
    //Recibir los datos del frontend
    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    //Guardamos los datos
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((e) => {
        res.status(500).json({
            error: e,
            success: false,
        })
    })
})

module.exports = router 