const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Donation', {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        idUser : {
            type: DataTypes.STRING,  
            allowNull: true
        },
        email : {
            type: DataTypes.STRING,  
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        
    },
    {
        freezeTableName: true,
        timestamps: false
    });
}