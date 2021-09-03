'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article)
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    authority: {
      type: DataTypes.ENUM,
      values: ['ADMIN', 'NORMAL', 'BANNED'],
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};