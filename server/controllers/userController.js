const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
const crypto = require('crypto');

app.use(express.json());

//@desc Register a new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill all the fields');
	}

	const userExists = await User.findOne({ email });

	//Checking if user already exists

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	//Hashing the password

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//Creating a new user

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//@desc Authentica a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//Check for user email
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}

	res.json({ message: 'Login User' });
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
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error('Error sending email: ' + error.message);
	}
});

// Reset Password Request Handler
const resetPasswordRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const resetToken = crypto.randomBytes(20).toString('hex');

	const resetTokenExpires = Date.now() + 3600000;

	user.resetPasswordToken = resetToken;
	user.resetPasswordExpires = resetTokenExpires;

	await user.save();

	const mailOptions = {
		from: { name: 'Emotisphere', address: process.env.GMAIL_EMAIL },
		to: email,
		subject: 'Password Reset Request',
		html: `<h1>Emotisphere Password Reset</h1>
        <p>We received a request to reset the password for your Emotisphere account associated with this email address.</p>

        <p>This link will expire in 24 hours for security purposes.</p>
        
        <p>If you did not request a password reset, please disregard this email. No changes will be made to your account. If you are concerned about your account's security, please contact our support team immediately at emotisphere@gmail.com.</p>
        
        <p>Please use the following link to reset your password:</p>
               <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>
               
               <p>For your security, please ensure that your new password is unique and not used for any other online accounts.</p>

        <p>Thank you for using Emotisphere. We're committed to ensuring the best security and experience for our users.</p>

        <p>Best regards,
        <br> Emotisphere Support Team</p>`,
	};

	await sendEmail(mailOptions);
	res.status(200).json({ message: 'Password reset email sent.' });
});

// Reset Password Handler
const resetPassword = asyncHandler(async (req, res) => {
	const { token, password } = req.body;

	const user = await User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400);
		throw new Error('Invalid or expired password reset token');
	}

	// Hash the new password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Update the user's password and clear the reset token fields
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
