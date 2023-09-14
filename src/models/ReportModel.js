const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    court_order: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted'),
      defaultValue: 'pending',
    },
    date: {
      type: DataTypes.DATEONLY, // TODO: check if this works with postgres
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
  }, { freezeTableName: true,}); // Para mantener el nombre tal como lo definimos en la BD utilizando sequelize.
};
