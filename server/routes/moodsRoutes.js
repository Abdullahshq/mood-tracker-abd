const express = require('express');
const router = express.Router();
const { getMood, postMood, deleteMood } = require('../controllers/moodController.js');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getMood);
router.post('/', protect, postMood);
router.delete('/:id', protect, deleteMood);

module.exports = router;
