const { Category } = require('../models')

module.exports = async (req, res, next) => {
    const { categoryId } = req.params
    
    try {
    let category = await Category.findOne({ where: { id: categoryId } })

    if (!category) {
        return res.status(404).json({
            message: 'Category not founded'
        })
    }
    req.category = category
    next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}