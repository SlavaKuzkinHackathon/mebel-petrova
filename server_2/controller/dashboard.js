const { Order, sequelize } = require('../models')
const { Op } = require("sequelize")

// to get daily income according to the product id
const getDailyIncome = async (req, res) => {
    const date = new Date()
    const year = req.query.year ? req.query.year : date.getFullYear()
    const month = req.query.month ? req.query.month : date.getMonth() + 1
    const day = req.query.day ? req.query.day : date.getDate()

    try {
        const income  = await Order.findAll({
            attributes: [
                'productId',
                [sequelize.fn('sum', sequelize.col('amount')), 'total'],
            ],
            where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), `${year}-${month}-${day}`),
            group: ['Order.productId'],
            raw: true,
            order: sequelize.literal('total DESC')
        })
        res.json(income)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// to get monthly income according to the product id
const getMonthlyIncome = async (req, res) => {
    const date = new Date()
    const year = req.query.year ? req.query.year : date.getFullYear()
    const month = req.query.month ? req.query.month - 1 : date.getMonth()
    const startMonth = new Date(`${year}-${month + 1}-01`)
    const endMonth = new Date(`${year}-${month + 2}-01`)
    try { 
        let income  = await Order.findAll({
            attributes: [
                'productId',
                [sequelize.fn('sum', sequelize.col('amount')), 'total'],
            ],
            where: {
                createdAt:{
                    [Op.gte]: startMonth,
                    [Op.lt]: endMonth
                }
            },
            group: ['Order.productId'],
            raw: true,
            order: sequelize.literal('total DESC')
        })
        res.json(income)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

// to get annual income according to the product id
const getAnnualIncome = async (req, res) => {
    const date = new Date()
    const year = req.query.year ? req.query.year - 1 : date.getFullYear() - 1
    const startYear = new Date(`${year + 1}-01-01`)
    const endYear = new Date(`${year + 2}-01-01`)
    try { 
        const income  = await Order.findAll({
            attributes: [
                'productId',
                [sequelize.fn('sum', sequelize.col('amount')), 'total'],
            ],
            where: {
                createdAt:{
                    [Op.gte]: startYear,
                    [Op.lt]: endYear
                }
            },
            group: ['Order.productId'],
            raw: true,
            order: sequelize.literal('total DESC')
        })
        res.json(income)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = {
    getDailyIncome,
    getMonthlyIncome,
    getAnnualIncome
}