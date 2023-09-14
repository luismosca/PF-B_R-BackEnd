const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('User', {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name_surName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }

    },
    {
        freezeTableName: true,
        timestamps: false
    });
}