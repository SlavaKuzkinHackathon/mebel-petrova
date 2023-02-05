const { Cart } = require('../models')

module.exports = async (req, res, next) => {
    const { cartId } = req.params
    
    try {
    let cart = await Cart.findOne({ where: { id: cartId } })

    if (!cart) {
        return res.status(404).json({
            message: 'Cart not founded'
        })
    }
    req.cart = cart
    next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}