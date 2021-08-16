'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User)
    }
  };
  Article.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    content: DataTypes.TEXT,
    deleted: {
      type: DataTypes.TEXT('tiny'),
      defaultValue: '0'
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};