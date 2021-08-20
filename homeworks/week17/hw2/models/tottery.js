'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lottery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lottery.init({
    award: DataTypes.STRING,
    title: DataTypes.STRING,
    probability: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    image: DataTypes.BLOB,
    type: DataTypes.STRING,
    deleted: {
      type: DataTypes.TEXT('tiny'),
      defaultValue: '0'
    }
  }, {
    sequelize,
    modelName: 'Lottery',
  });
  return Lottery;
};
