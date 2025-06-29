const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const db = require('./models');
const passport = require('passport');
const path = require('path');

// Log the NODE_ENV to debug production build issues
console.log(`Current NODE_ENV: '${process.env.NODE_ENV}'`);

// Check if JWT_SECRET is loaded
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in .env file.'.red.bold);
  process.exit(1);
}

const startServer = async () => {
  try {
    // Connect to and sync database
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.'.cyan.underline.bold);
    
    // Sync database models
    await db.sequelize.sync({ alter: true });
    
    console.log('Models synchronized with database.'.cyan);

    // Initialize Express app
    const app = express();

    // Passport middleware
    app.use(passport.initialize());
    require('./config/passport')(passport);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());


    // API routes
    app.use('/api/moods', require('./routes/moodsRoutes'));
    app.use('/api/users', require('./routes/userRoutes'));

    // Serve frontend in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/mood-tracker/build')));

        app.get('*', (req, res) => 
            res.sendFile(path.resolve(__dirname, '../', 'client', 'mood-tracker', 'build', 'index.html'))
        );
    } else {
        app.get('/', (req, res) => {
            res.send('API is running...');
        });
    }

    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error('Failed to start server:'.red.bold, error);
    process.exit(1);
  }
};

startServer();

