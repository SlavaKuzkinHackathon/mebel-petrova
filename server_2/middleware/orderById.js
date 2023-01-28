const { Order } = require('../models')

module.exports = async (req, res, next) => {
    const { orderId } = req.params
    
    try {
    let order = await Order.findOne({ where: { id: orderId } })

    if (!order) {
        return res.status(404).json({
            message: 'Order not founded'
        })
    }
    req.order = order
    next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}