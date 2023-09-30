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
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'banned'),
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebookId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });
}