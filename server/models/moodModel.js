const mongoose = require('mongoose');

const User = require('./userModel'); 

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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    note: {
        type: String,
        required: false, // make it optional
        trim: true
    }
});

module.exports = mongoose.model('moodModel', moodSchema);
