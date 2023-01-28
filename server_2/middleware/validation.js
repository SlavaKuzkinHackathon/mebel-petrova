const { check } = require('express-validator')

const registerValidate = [
    check('name', 'Name is required').not(0).isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({
        min: 8
    })
]

const loginValidate = [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
]

const categoryValidate = [
    check('name', 'Name is required').trim().not().isEmpty()
]

module.exports = {
    registerValidate,
    loginValidate,
    categoryValidate
}