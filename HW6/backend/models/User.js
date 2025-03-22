const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        group: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'user'
        },
    }, {
        tableName: 'accounts',
        timestamps: false,
    });

    return User;
};
