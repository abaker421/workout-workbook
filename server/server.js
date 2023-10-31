const express = require('express')
const PORT = 3001

const app = express()

app.listen(PORT.process.env || PORT), () => {
    console.log(`Listening on port ${PORT}`)
}

