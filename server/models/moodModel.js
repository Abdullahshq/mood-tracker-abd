const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    moodEmoji: {
        type: String,
        required: true,
        trim: true
    },
    moodValue: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('moodModel', moodSchema);
