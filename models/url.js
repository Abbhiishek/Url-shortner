const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortcode: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    visits: [{
        timestamp: {
            type: Number,
        },
    }]
}, { timestamps: true })

const Url = mongoose.model('Url', urlSchema)

module.exports = Url