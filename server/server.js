require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts.js')
const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json({raw: true}))
app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB and listening on port ${PORT}`)
        })
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
})