const { Order } = require('../models')
const { Product } = require('../models')

const addOrder = async (req, res) => {
    try {
        const order = {
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            amount: req.body.amount,
            address: req.body.address,
            status: req.body.status
        }

        if (!order.userId
            ||!order.productId
            ||!order.quantity
            ||!order.amount
            ||!order.address
            ||!order.status) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const orderQuantity = req.body.quantity
        const productQuantity = await Product.findOne({
            where: { id: order.productId},
            attributes: ['id','quantity']
        })
        const productSold = await Product.findOne({
            where: { id: order.productId},
            attributes: ['id','sold']
        })

        if (productQuantity < orderQuantity) {
            return res.status(400).json({
                message: 'Please reduce products'
            })
        }

        //decrease in the quantity of products in stock according to the quantity of products purchased
        await productQuantity.update({
            quantity: productQuantity.quantity - orderQuantity
        })

        //number of products sold
        await productSold.update({
            sold: productSold.sold + orderQuantity
        })

        const newOrder = await Order.create(order)
        const saveOrder = await newOrder.save()
        res.json(saveOrder)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [['createdAt','DESC']]
        })
        res.json(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getUserOrders = async (req, res) => {
    res.status(200).json(req.order)
}

const updateOrder = async (req, res) => {
    let order = req.order
    const newOrder = {
        productId: req.body.productId,
        quantity: req.body.quantity,
        amount: req.body.amount,
        address: req.body.address,
        status: req.body.status
    }
    try {
        const updateOrder = await order.update(newOrder)
        res.json(updateOrder)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const deleteOrder = async (req, res) => {
    let order = req.order
    try {
        await order.destroy()
        res.json({
            message: 'Order deleted successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = {
    addOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
    deleteOrder
}