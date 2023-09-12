const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
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
        }
    });
}