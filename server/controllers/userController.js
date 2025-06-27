const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { User, Op } = require('../models');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

app.use(express.json());

//@desc Register a new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400).send('Please provide all required fields');
		return;
	}

	const userExists = await User.findOne({ where: { email } });
	if (userExists) {
		res.status(400).send('User with that email already exists');
		return;
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user && user.id) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400).send('Invalid user data, failed to create user');
	}
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).send('Please provide email and password');
		return;
	}

	const user = await User.findOne({ where: { email } });

	const passwordIsValid = user ? await bcrypt.compare(password, user.password) : false;

	if (user && passwordIsValid) {
		res.status(200).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(401).send('Invalid email or password');
	}
});

//@desc Get user data
//@route GET /api/users/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

//Generate JWT

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.GMAIL_EMAIL,
		pass: process.env.GMAIL_PASSWORD,
	},
});

// Function to send emails
const sendEmail = asyncHandler(async (mailOptions) => {
		await transporter.sendMail(mailOptions);
});

// Reset Password Request Handler
const resetPasswordRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ where: { email } });

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	}

	const resetToken = crypto.randomBytes(20).toString('hex');
	user.resetPasswordToken = resetToken;
	user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

	await user.save();

	const mailOptions = {
		from: { name: 'Emotisphere', address: process.env.GMAIL_EMAIL },
		to: email,
		subject: 'Password Reset Request',
		html: `<p>Please use the following link to reset your password:</p><a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>`,
	};

	await sendEmail(mailOptions);
	res.status(200).json({ message: 'Password reset email sent.' });
});

// Reset Password Handler
const resetPassword = asyncHandler(async (req, res) => {
	const { token, password } = req.body;

	const user = await User.findOne({
		where: {
		resetPasswordToken: token,
			resetPasswordExpires: { [Op.gt]: Date.now() },
		}
	});

	if (!user) {
		res.status(400).json({ message: 'Invalid or expired password reset token' });
		return;
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	user.password = hashedPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpires = undefined;

	await user.save();

	res.status(200).json({ message: 'Password has been reset successfully' });
});

module.exports = {
	registerUser,
	loginUser,
	getMe,
	sendEmail,
	resetPasswordRequest,
	resetPassword,
};
