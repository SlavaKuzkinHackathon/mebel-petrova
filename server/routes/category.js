const express = require('express')
const router = express.Router()
const { addCategory, getAllCategories, getCategory, changeCategory, deleteCategory } = require('../controller/category')
const { categoryValidate } = require('../middleware/validation')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const categoryById = require('../middleware/categoryById')

router.post('/', auth, adminAuth, categoryValidate, addCategory)

router.get('/all', getAllCategories)

router.get('/:categoryId', categoryById, getCategory)

router.put('/update/:categoryId', auth, adminAuth, categoryById, changeCategory)

router.delete('/delete/:categoryId', auth, adminAuth, categoryById, deleteCategory)

module.exports = router