require('dotenv').config()
const express = require('express')

const workoutRoutes = require('./routes/workouts.js')
const PORT = process.env.PORT   

const app = express()

app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)

app.get('/', (req,res) => {
    res.json({mssg: 'Welcome to the app'})
})

app.listen(PORT), () => {
    console.log(`Listening on PORT ${PORT}`)
}