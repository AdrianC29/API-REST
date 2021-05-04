const express = require('express')
const app = express()
const morgan = require('morgan')
const filmes = require('./filmes')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/filmes', filmes)

module.exports = app

