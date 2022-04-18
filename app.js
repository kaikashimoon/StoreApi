require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products.js')

const notFoundMidlleware = require('./middleware/not-found')
const errorMidlleware = require('./middleware/error-handler')

//middleware

app.use(express.json())

//routes

app.get('/', (req, res)=> {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productsRouter)

//products route

app.use(notFoundMidlleware)
app.use(errorMidlleware)

const port = process.env.PORT || 3000


const start = async () => {
    try {
        //CONNECT DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()