const { Sequelize } = require('sequelize');

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_SERVER,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true
            }
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_SERVER,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true
            }
        }
    }
};

module.exports = config;
