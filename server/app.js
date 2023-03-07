const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

dotenv.config({path: './config.env'})
require('./db/conn')
// const User = require('./model/userSchema')
app.use(express.json())

app.use(require('./router/auth'))
app.use(cookieParser())

const PORT = process.env.PORT

// app.get('/about', (req,res)=>{
//     res.send(`Hello world from the server`)
// })

// app.get('/contact', (req,res)=>{
//     res.send(`Hello world from the server`)
// })

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})
