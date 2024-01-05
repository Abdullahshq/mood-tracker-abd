const asyncHandler = require('express-async-handler');
const Mood = require('../models/moodModel');

// Function to get moods for the logged-in user
const getMood = asyncHandler(async (req, res, next) => {
    try {
        let query = { user: req.user.id };

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

// Function to post a mood for the logged-in user
const postMood = asyncHandler(async (req, res, next) => {
    try {
        const { moodEmoji, moodValue, date, note } = req.body;

        if (!moodEmoji || !moodValue || !date) {
            const err = new Error('Mood emoji, mood value, and date are required.');
            err.status = 400;
            throw err;
        }

        const newMood = await Mood.create({
            moodEmoji,
            moodValue,
            date,
            note,
            user: req.user.id // Associating the mood with the logged-in user
        });

        res.status(201).json(newMood);
    } catch (error) {
        next(error);
    }
});

// Function to delete a mood for the logged-in user
const deleteMood = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        const mood = await Mood.findOne({ _id: id, user: req.user.id });

        if (!mood) {
            res.status(404);
            throw new Error('Mood not found or not authorized to delete');
        }

        await Mood.findByIdAndDelete(id);
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
