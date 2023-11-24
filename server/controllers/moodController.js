// moodController.js

const getMood = (req, res, next) => {
    try {
        // Logic to retrieve moods goes here

        console.log('Query parameters:', req.query);
        res.status(200).json({ message: 'Moods retrieved successfully' });
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
};

const postMood = (req, res, next) => {
    try {
        const { mood, date } = req.body;

        if (!mood || !date) {
            const err = new Error('Both mood and date are required.');
            err.status = 400; // Bad Request
            throw err;
        }

        // Logic to save the mood goes here

        console.log('Received mood:', mood, 'on date:', date);
        res.status(201).json({ message: 'Mood saved successfully' });
    } catch (error) {
        next(error);
    }
};

const deleteMood = (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the ID or include logic to check if the mood exists
        // Logic to delete the mood goes here

        console.log('Deleting mood with ID:', id);
        res.status(200).json({ message: `Mood with ID ${id} deleted successfully` });
    } catch (error) {
        error.status = 500; // Internal Server Error
        next(error);
    }
};

module.exports = {
    getMood,
    postMood,
    deleteMood,
};
