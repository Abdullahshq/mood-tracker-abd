const express = require('express');
const router = express.Router();
const { getMood, postMood, deleteMood } = require('../controllers/moodController.js');

router.get('/', getMood);
router.post('/', postMood);
router.delete('/:id', deleteMood);

module.exports = router;
