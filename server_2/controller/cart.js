const { Cart } = require('../models')

const addCart = async  (req, res) => {
    const cart = {
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    if (!cart.userId||!cart.productId||!cart.quantity) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const newCart = await Cart.create(cart)
        const saveCart = await newCart.save()
        res.status(201).json(saveCart)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll({
            order: [['createdAt','DESC']]
        })
        res.status(200).json(carts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getCart = async (req, res) => {
    res.status(200).json(req.cart)
}

const updateCart = async (req, res) => {
    let cart = req.cart
    const newCart = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    try {
        const updateCart = await cart.update(newCart)
        res.status(200).json(updateCart)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}


const deleteCart = async (req, res) => {
    let cart = req.cart
    try {
        await cart.destroy()
        res.status(200).json({
            message: 'Your cart deleted successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}


module.exports = {
    addCart,
    getAllCarts,
    getCart,
    updateCart,
    deleteCart
}