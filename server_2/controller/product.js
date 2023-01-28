const multer = require('multer')
const path = require('path')
const { Product } = require('../models')
const { Category } = require('../models')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null,  `${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            return cb(new Error('Not allowed to this file'));
    }
}
}).single('photo')


const addProduct = async  (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        price: req.body.price,
        quantity: req.body.quantity,
        sold: req.body.sold,
        photo: req.file.path,
        shipping: req.body.shipping
    }
    console.log(product)
    if (!product.name||
        !product.description||
        !product.categoryId||
        !product.price||
        !product.quantity||
        !product.shipping,
        !product.photo) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const newProduct = await Product.create(product)
        const saveProduct = await newProduct.save()
        console.log(saveProduct)
        res.status(201).json(saveProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getProduct = (req, res) => {
    req.product.photo = undefined
    res.status(200).json(req.product)
}

const getProductPhoto = async  (req, res) => {
    const { productId } = req.params

    try {
        const product = await Product.findOne({
            where: { id: productId },
            attributes: ['photo']
        })
        const image = path.join(__dirname, '/../' + `/${product.photo.toString()}/`)
        res.sendFile(image)
    } catch (err) {
        if (err) console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}

const getProductList = async (req, res) => {
    let sortby = req.query.sortby ? req.query.sortby : 'id'
    let order = req.query.order ? req.query.order : 'ASC'
    let offset = req.query.offset ? parseInt(req.query.offset) : undefined
    let limit = req.query.limit ? parseInt(req.query.limit) : undefined

    try {
        const products = await Product.findAll({
            include: [{ model: Category, as: 'category' }],
            order: [[sortby,order]],
            offset: offset,
            limit: limit
        })

        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Invalid queries' })
    }
}


const changeProduct = async (req, res) => {
    let product = req.product

    const newProduct = { 
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        price: req.body.price,
        quantity: req.body.quantity,
        sold: req.body.sold,
        photo: req.file.path,
        shipping: req.body.shipping
    }

    try {
        const updateProduct = await product.update(newProduct)
        res.status(200).json(updateProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}


const deleteProduct = async (req, res) => {
    let product = req.product
    const { productId } = req.params
    try {
        let deletedProduct = await Product.findOne({ where: {id: productId} })
        await product.destroy()
        res.status(200).json({
            message: `${deletedProduct.name} deleted successfully`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' })
    }
}


module.exports = {
    addProduct,
    getProduct,
    getProductPhoto,
    upload,
    getProductList,
    changeProduct,
    deleteProduct,
}


