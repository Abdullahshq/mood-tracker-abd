const asyncHandler = require('express-async-handler');

const Mood = require('../models/moodModel');

const getMood = asyncHandler(async (req, res, next) => {
    try {
        let query = {};

        if (req.query.date) {
            const date = new Date(req.query.date);
            date.setHours(0, 0, 0, 0); 

            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1); 

           
            query.date = { $gte: date, $lt: nextDay };
        }

        const moods = await Mood.find(query);

        res.status(200).json(moods);
    } catch (error) {
        next(error);
    }
});

const postMood = asyncHandler(async (req, res, next) => {
    try {
        const { moodEmoji, moodValue, date } = req.body;

        if (!moodEmoji || !moodValue || !date) {
            const err = new Error('Mood emoji, mood value, and date are required.');
            err.status = 400;
            throw err;
        }

        const newMood = await Mood.create({ moodEmoji, moodValue, date });

        res.status(201).json(newMood);
    } catch (error) {
        next(error);
    }
});


const deleteMood = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        // Use findByIdAndDelete
        const mood = await Mood.findByIdAndDelete(id);

        if (!mood) {
            res.status(404);
            throw new Error('Mood not found');
        }

        res.status(200).json({ message: `Mood with ID ${id} deleted successfully` });
    } catch (error) {
        next(error);
    }
});


module.exports = {
    getMood,
    postMood,
    deleteMood,
};
