const { Cart } = require('../models')

module.exports = async (req, res, next) => {
    const { userId } = req.params
    
    try {
    let cart = await Cart.findAll({
        where: { userId: userId },
        order: [['createdAt','DESC']]
    })

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