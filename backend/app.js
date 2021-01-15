const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())

const ProductsRouter = require('./routes/products')
const CategoriesRouter = require('./routes/category')
const api = process.env.API_URL 

//Routers
app.use(`${api}/products`, ProductsRouter)
app.use(`${api}/categories`, CategoriesRouter)


//Conexion a MongoAtlas
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
}).then(() => {
    console.log('Conexion satisfactoria')
}).catch((e) => {
    console.log(e)
})

//Creacion del puerto
app.listen(process.env.PORT, () => {
    console.log("hola")
})