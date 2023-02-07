const express = require('express')
const router = express.Router()
const { addProduct, upload,getProductPhoto, getProductList, changeProduct, deleteProduct, getProduct } = require('../controller/product')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const productById = require('../middleware/productById')


router.post('/', auth, adminAuth, upload, addProduct)

router.get('/all/search', getProductList)

router.get('/:productId', productById, getProduct)

router.get('/photo/:productId/', productById, getProductPhoto)

router.put('/update/:productId', auth, adminAuth, productById, upload, changeProduct)

router.delete('/delete/:productId', auth, adminAuth, productById, deleteProduct)

module.exports = router




