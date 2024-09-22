require('dotenv').config()

const PORT = process.env.SERVER_PORT

const express = require('express')
const app = express()

const session = require('express-session')
const consign = require('consign')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use('/imgs/profile', express.static('../storage/images/profiles'))

consign()
    .include('./middlewares')
    .then('./models')
    .then('./controllers/validation.js')
    .then('./controllers')
    .then('./routes')
    .into(app)

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))