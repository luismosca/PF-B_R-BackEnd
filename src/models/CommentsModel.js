const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('pending', 'approved', 'refused'),
            defaultValue: 'pending',
        }
    },
        {
            freezeTableName: true,
        });
}