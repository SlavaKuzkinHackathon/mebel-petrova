const { Category } = require('../models')
const { validationResult } = require('express-validator')


const addCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0] })
    }

    const { name } = req.body

    try {
        const category = await Category.findOne({ where: {name: name} })

        if (category) {
            return res.status(403).json({ message: 'This category already exist' })
        }
        const newCategory = await Category.create({ name })
        const saveCategory = await newCategory.save()
        res.status(201).json(saveCategory)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getCategory = async (req, res) => {
    res.status(200).json(req.category)
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({})
        res.status(200).json(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const changeCategory = async (req, res) => {
    let category = req.category
    const { name } =  req.body
    console.log(name)

    try {
        const updateCategory = await category.update({ name: name })
        console.log(updateCategory)
        res.status(200).json(updateCategory)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const deleteCategory = async (req, res) => {
    let category = req.category
    const { categoryId } = req.params
    try {
        let deletedCategory = await Category.findOne({ where: {id: categoryId} })
        await category.destroy()
        res.status(200).json({
            message: `${deletedCategory.name} deleted successfully`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = {
    addCategory,
    getCategory,
    getAllCategories,
    changeCategory,
    deleteCategory
}