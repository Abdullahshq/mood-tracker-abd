# Emotisphere Mood Tracker

<img src="https://i.ibb.co/b2j74Q5/login.jpg" alt="Image Description" height="600" width="900"/>


## Overview
Emotisphere is a comprehensive mood tracking application allowing users to register, log in, and track their daily moods. It uses the MERN stack (MongoDB, Express.js, React, Node.js) and offers features like user authentication, RESTful APIs, and interactive data visualization.

## Features
- **User Authentication**: Including registration, login, and password reset.
- **Mood Tracking**: Users can record their moods daily with emojis and optional notes.
- **Mood Analysis**: View past entries and analyze mood trends.
- **Responsive Design**: Ensuring compatibility with various devices.

## Technologies
- **Frontend**: React (Hooks, Redux Toolkit)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer for password reset functionality
- **Data Visualization**: Chart.js
- **Styling**: CSS, FontAwesome

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Clone the Repository

git clone https://github.com/your-username/mood-tracker.git
cd mood-tracker


## Backend Setup

To get the backend server running:

1. **Navigate to the backend directory:**
   ```bash
   cd server
   npm install
   npm run server

### Create a .env file in the backend directory with the following content:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GMAIL_EMAIL=your_gmail_email
GMAIL_PASSWORD=your_gmail_password


Start the server: 
npm start


## Frontend Setup
```bash
cd client
npm install
npm start

```

### Access the application
Open your browser and go to http://localhost:3000.

# Usage

The application offers various features for tracking and analyzing your mood. Here's how you can use them:

### Register
- **Sign up for a new account.**
  - Navigate to the registration page.
  - Fill in the required fields.
  - Submit the form to create your account.

### Login
- **Log into the application.**
  - Open the login page.
  - Enter your credentials.
  - Access your personal mood tracking dashboard.

### Record Mood
- **Select your current mood emoji and add a note (optional).**
  - Choose the emoji that best represents your current mood.
  - Optionally, add a note for more context or details.
  - Save your entry for later review.

### View Entries
- **Check your past mood entries.**
  - Navigate to the entries/history section.
  - Browse through your past mood records.
  - Gain insights into your mood patterns over time.

### Mood Statistics
- **Analyze your mood trends using the statistics feature.**
  - Go to the statistics page.
  - View charts and graphs representing your mood trends.
  - Filter data by date range for detailed analysis.

### Reset Password
- **Request a password reset link if you forgot your password.**
  - Click on the 'Forgot Password' link.
  - Enter your email address to receive the reset link.
  - Follow the instructions in the email to reset your password.

# API Endpoints

The application provides several RESTful endpoints for handling user and mood data.

## User Routes

- `POST /api/users/`: 
  - **Description**: Register a new user.
  - **Access**: Public

- `POST /api/users/login`: 
  - **Description**: Authenticate a user.
  - **Access**: Public

- `GET /api/users/me`: 
  - **Description**: Get user data.
  - **Access**: Protected

- `POST /api/users/reset-password-request`: 
  - **Description**: Password reset request.
  - **Access**: Public

- `POST /api/users/reset-password`: 
  - **Description**: Reset password.
  - **Access**: Public

## Mood Routes

- `GET /api/moods/`: 
  - **Description**: Get moods.
  - **Access**: Protected

- `POST /api/moods/`: 
  - **Description**: Post a new mood.
  - **Access**: Protected

- `DELETE /api/moods/:id`: 
  - **Description**: Delete a mood.
  - **Access**: Protected











