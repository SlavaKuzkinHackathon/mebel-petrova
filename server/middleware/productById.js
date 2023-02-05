const { Product } = require('../models')
const { Category } = require('../models')

module.exports = async (req, res, next) => {
    const { productId } = req.params
    
    try {
    let product = await Product.findOne({
        where: { id: productId },
        include: [{ model: Category, as: 'category' }]
    })

    if (!product) {
        return res.status(404).json({
            message: 'Product not founded'
        })
    }
    req.product = product
    next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}