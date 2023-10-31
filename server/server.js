require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT

const app = express()

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req,res) => {
    res.json({mssg: 'Welcome to the app'})
})

app.listen(PORT), () => {
    console.log(`Listening on PORT ${PORT}`)
}