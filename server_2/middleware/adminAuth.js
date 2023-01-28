const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } })

        if(user.role === 0) {
            return res.status(403).json({
                message: 'This page only accessible for admin'
            })
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}