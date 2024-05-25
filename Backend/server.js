const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./routes')

const connectDB = require('./connection/dbconnection')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(bodyParser.json())


app.use('/api', routes)

//connect to db
connectDB()

process.on('uncaughtException', (err) => {
    console.log('something went wrong', err)
})

const PORT = process.env.PORT || '5000'

app.listen(PORT, () => {
    console.log('Server running on', PORT)
})

