const express = require('express')
const server = express()
const connection = require('./db/connection')
const cors = require('cors')
const HOST = process.env.HOST
const PORT = process.env.PORT
const productRouter = require('./routers/productsRouters')
const passport = require('./security/passportConfig');
const authRouters = require('./routers/authRouters')
const paymentRoutes = require('./routers/paymentRouter')
require('dotenv').config();
server.use(express.json());
server.use(cors())

server.use(passport.initialize())



server.use('/auth', authRouters)
server.use('/', productRouter)
server.use('/', paymentRoutes)





connection.connect((err => {
    if (err) {
        return console.log(err.stack)
    }
    console.log('connesso al database');
}))

server.listen(PORT, () => {
    console.log(`connesso a ${HOST}:${PORT}`);
})
