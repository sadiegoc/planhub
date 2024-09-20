require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    const corsOptions = {
        origin: process.env.CORS_ORIGIN, // origem da conexão (frontend)
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true // para permitir os cookies de credenciais para o logout do usuário
    }
    app.use(bodyParser.json()) // requisições e respostas em json
    app.use(cors(corsOptions))
}