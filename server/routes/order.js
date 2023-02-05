const express = require('express')
const router = express.Router()
const { addOrder, getAllOrders,getUserOrders, updateOrder, deleteOrder } = require('../controller/order')
const orderById = require('../middleware/orderById')
const orderByUserId = require('../middleware/orderByUserId')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.post('/', auth, addOrder)

router.get('/all', auth, adminAuth, getAllOrders)

router.get('/:userId', auth, orderByUserId, getUserOrders)

router.put('/update/:orderId', auth, adminAuth, orderById, updateOrder)

router.delete('/delete/:orderId', auth, adminAuth, orderById, deleteOrder)

module.exports = router