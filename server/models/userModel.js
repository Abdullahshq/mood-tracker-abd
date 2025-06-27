const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please provide a name' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add an email' },
            isEmail: { msg: 'Please add a valid email' }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Please add a password' }
        }
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

    User.associate = (models) => {
        User.hasMany(models.Mood, {
            foreignKey: 'userId',
            as: 'moods',
        });
    };

    return User;
};
