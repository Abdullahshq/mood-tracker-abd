const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    getMoods,
    setMood,
    updateMood,
    deleteMood,
    getMoodsByDate,
} = require('../controllers/moodController');

const protect = passport.authenticate('jwt', { session: false });

router.route('/').get(protect, getMoods).post(protect, setMood);
router.route('/date').get(protect, getMoodsByDate);
router.route('/:id').delete(protect, deleteMood).put(protect, updateMood);

module.exports = router;
