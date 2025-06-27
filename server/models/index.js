'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);

const db = {};

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Database connection string is not defined. Please set DB_CONNECTION_STRING in your .env file.');
}

const parseConnectionString = (connStr) => {
  const params = {};
  const parts = connStr.trim().split(';');
  parts.forEach(part => {
    if (part) {
      const [key, ...valueParts] = part.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        params[key.trim().toLowerCase()] = value;
      }
    }
  });
  return params;
};

const params = parseConnectionString(connectionString);
const server = params['server'];

if (!server) {
  throw new Error('Database connection string is invalid or missing the "Server" parameter.');
}

const sequelize = new Sequelize(params['initial catalog'], params['user id'], params['password'], {
  host: server.split(',')[0].replace('tcp:', ''),
  port: server.split(',')[1] || 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: params['encrypt'] ? params['encrypt'].toLowerCase() === 'true' : true,
      trustServerCertificate: params['trustservercertificate'] ? params['trustservercertificate'].toLowerCase() === 'true' : false,
      connectTimeout: params['connection timeout'] ? parseInt(params['connection timeout'], 10) * 1000 : 30000,
    }
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 