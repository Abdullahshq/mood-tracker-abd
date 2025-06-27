const express = require('express');
const passport = require('passport');
const {
	registerUser,
	loginUser,
	getMe,
	resetPasswordRequest,
	resetPassword,
} = require('../controllers/userController');

const router = express.Router();

const protect = passport.authenticate('jwt', { session: false });

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/request-password-reset', resetPasswordRequest);
router.post('/reset-password', resetPassword);

module.exports = router;