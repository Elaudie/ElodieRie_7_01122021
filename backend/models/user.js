const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    };
    User.init(
        {
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            photo: { type: DataTypes.STRING, allowNull: true },
        },
        {
            sequelize, modelName: "User"
        }
    
    )}

    return User;
