const express = require('express')
const router = express.Router()
const { getDailyIncome, getMonthlyIncome, getAnnualIncome } = require('../controller/dashboard')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.get('/daily/search', auth, adminAuth, getDailyIncome)

router.get('/monthly/search', auth, adminAuth, getMonthlyIncome)

router.get('/annual/search', auth, adminAuth, getAnnualIncome)

module.exports = router