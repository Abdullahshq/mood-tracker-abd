const express = require('express');

const router = express.Router();
const {registerUser, loginUser, getMe, resetPassword} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware')

const { resetPasswordRequest } = require('../controllers/userController');



router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);




module.exports = router;