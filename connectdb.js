const mongoose = require('mongoose')


async function connectDB(url) {
    try {
        await mongoose.connect(url)
        console.log('Connected to the database')
    } catch (error) {
        console.log('Error connecting to the database')
        console.log(error)
    }
}

module.exports = connectDB
