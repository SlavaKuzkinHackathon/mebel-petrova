require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

const { sequelize } = require('./models')

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

const swaggerOptions  = {
    options: {
        cookieAuth: {
            name: 'access_token',
            schema: {
                type: 'string',
                in: 'cookie'
            }
        }
    }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerOptions))

// Routes
app.use('/user', require('./routes/auth'))
app.use('/category', require('./routes/category'))
app.use('/product', require('./routes/product'))
app.use('/cart', require('./routes/cart'))
app.use('/order', require('./routes/order'))
app.use('/dashboard/income', require('./routes/dashboard'))


// Page not founded
app.use((req, res) => {
    res.status(404).json({
        message: 'Page not founded'
    })
})


app.listen(port, async (req, res) => {
    console.log(`Server is running on ${port}`)
    await sequelize.authenticate()
    console.log('Database connected!')
})