const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Comment', {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // reportId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
        // userId: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
    },
    {
        freezeTableName: true,
    });
}