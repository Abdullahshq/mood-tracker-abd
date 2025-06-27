const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');

const Mood = sequelize.define('Mood', {
    moodEmoji: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    moodValue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

// Define the relationship
Mood.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Mood, { foreignKey: 'userId' });

module.exports = Mood;

module.exports = mongoose.model('moodModel', moodSchema);
