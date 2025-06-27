const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const Mood = sequelize.define('Mood', {
    moodEmoji: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
      },
    },
    moodValue: {
        type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    note: {
        type: DataTypes.STRING,
      allowNull: true,
    },
    // The userId will be added automatically by the association
}, {
    timestamps: true,
  });

  Mood.associate = (models) => {
    Mood.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user',
    });
  };

  return Mood;
};
