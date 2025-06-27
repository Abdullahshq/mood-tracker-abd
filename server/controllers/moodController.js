const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Mood } = require('../models'); // Assuming models are exported from an index file
const User = require('../models/userModel');

// @desc    Get moods for the logged-in user
// @route   GET /api/moods
// @access  Private
const getMoods = asyncHandler(async (req, res) => {
    const moods = await Mood.findAll({ where: { userId: req.user.id } });
    res.status(200).json(moods);
});

// @desc    Get moods for a specific date
// @route   GET /api/moods/date
// @access  Private
const getMoodsByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    if (!date) {
        res.status(400);
        throw new Error('Date query parameter is required');
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const moods = await Mood.findAll({
        where: {
            userId: req.user.id,
            date: {
                [Op.between]: [startDate, endDate],
            },
        },
    });
    res.status(200).json(moods);
});

// @desc    Set a new mood
// @route   POST /api/moods
// @access  Private
const setMood = asyncHandler(async (req, res) => {
    const { moodEmoji, moodValue, date, note } = req.body;
    if (!moodEmoji || !moodValue) {
        res.status(400);
        throw new Error('Please provide moodEmoji and moodValue');
    }

    const mood = await Mood.create({
        moodEmoji,
        moodValue,
        date: date ? new Date(date) : new Date(),
        note,
        userId: req.user.id,
    });

    res.status(201).json(mood);
});

// @desc    Update a mood
// @route   PUT /api/moods/:id
// @access  Private
const updateMood = asyncHandler(async (req, res) => {
    const mood = await Mood.findByPk(req.params.id);

    if (!mood) {
        res.status(404);
        throw new Error('Mood not found');
    }

    // Check for user
    if (mood.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedMood = await mood.update(req.body);

    res.status(200).json(updatedMood);
});

// @desc    Delete a mood
// @route   DELETE /api/moods/:id
// @access  Private
const deleteMood = asyncHandler(async (req, res) => {
    const mood = await Mood.findByPk(req.params.id);

    if (!mood) {
        res.status(404);
        throw new Error('Mood not found');
    }

    // Check for user
    if (mood.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await mood.destroy();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getMoods,
    getMoodsByDate,
    setMood,
    updateMood,
    deleteMood,
};
