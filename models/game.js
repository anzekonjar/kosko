const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    result: {
        type: [Object],
        required: true
    }
})

module.exports = mongoose.model('Game', gameSchema)