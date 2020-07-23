const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ["local", "google", "facebook"],
        required: true
    },

    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },

    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },

    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
})

module.exports = mongoose.model("user", newSchema)

