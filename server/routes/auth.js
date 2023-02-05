const express = require('express')
const router = express.Router()
const { addUser, loginUser, getAllUser, logoutUser } = require('../controller/auth')
const { registerValidate, loginValidate } = require('../middleware/validation')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.post('/register', registerValidate, addUser)

router.post('/login', loginValidate, loginUser)

router.get('/all', auth, adminAuth,  getAllUser)

router.get('/logout', logoutUser)

module.exports = router