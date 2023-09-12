const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
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
    jude_order: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM('pending', 'accepted'),
      defaultValue: 'pending',
    },
    feha: {
      type: DataTypes.DATEONLY, // TODO: check if this works with postgres
      allowNull: false,
    },
    lugar: {
      type: DataTypes.TEXT,
    },
  });
};
