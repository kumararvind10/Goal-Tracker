const mongoose = require('mongoose')
const { mongoUrl } = require('../config/db')



const connectDB = async () => {
    try {
        let conn = await mongoose.connect(mongoUrl, { useNewUrlParser: true })
        console.log('Connect to mongodb')
    } catch (error) {
        console.log('something went wroong', error)
        process.exit(0)
    }
}

module.exports = connectDB
