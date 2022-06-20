const path = require('path')
const express = require('express')
const colors = require('colors')
const { response } = require('express')
const dotenv = require('dotenv').config()
const usersroute= require('./routes/usersroute')
const {connection} = require('./config/db')
const cors= require('cors')

connection()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.use('/api/users', usersroute)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req,res) =>{
    res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build' , 'index.html')
    )
})
const port = process.env.port || 8000
app.listen(port, () => {console.log(`server running on port ${port}`.blue.underline)})


