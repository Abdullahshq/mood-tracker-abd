const { Sequelize } = require('sequelize');
const config = require('./dbConfig');

let sequelize;

const connectDB = async () => {
    try {
        const env = process.env.NODE_ENV || 'development';
        const dbConfig = config[env];
        
        sequelize = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            {
                host: dbConfig.host,
                dialect: dbConfig.dialect,
                dialectOptions: dbConfig.dialectOptions
            }
        );

        await sequelize.authenticate();
        console.log('Database connection has been established successfully.'.cyan.underline.bold);
        
        // Sync all models
        await sequelize.sync();
        console.log('Models synchronized with database.'.cyan);
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize };
