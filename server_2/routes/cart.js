const express = require('express')
const router = express.Router()
const { addCart, getAllCarts, getCart, updateCart, deleteCart } = require('../controller/cart')
const cartById = require('../middleware/cartById')
const cartByUserId = require('../middleware/cartByUserId')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.post('/', auth, addCart)

router.get('/all', auth, adminAuth, getAllCarts)

router.get('/:userId', auth, cartByUserId, getCart)

router.put('/update/:cartId', auth, cartById, updateCart)

router.delete('/delete/:cartId', auth, cartById, deleteCart)

module.exports = router