require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { User } = require('../models')

const addUser = async (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        let user = await User.findOne({ where: { email: email } })
        if (user) {
            return res.status(400).json({
                errors: [{ message: 'User already exists' }]
            })
        }
        
        const newUser = await User.create({ name, email, password })
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, salt)
        const saveNewUser = await newUser.save()
        
        const payload = { user: { id: saveNewUser.id} }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        })
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000
        })
        res.json({ message: 'You registered successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ where: { email:email } })
        if (!user) {
            return res.status(400).json({
                errors: [{ message: 'User does not exist' }]
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            res.status(400).json({
                errors: [{ message: 'Please enter the correct password' }]
            })
        }

        const payload = { user: { id: user.id} }
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15s'}
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 15 * 1000
        })
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000
        })
        
        res.json({ message: 'You logged in' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['id','ASC']]
        })
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const logoutUser = (req, res) => {
    res.cookie('access_token', '', { maxAge: 0 })
    res.cookie('refresh_token', '', { maxAge: 0 })
    res.json({ message: 'You logout' });
} 

module.exports = {
    addUser,
    loginUser,
    getAllUser,
    logoutUser
}