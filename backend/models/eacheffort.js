'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EachEffort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EachEffort.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  EachEffort.init({
    date: DataTypes.DATE,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EachEffort',
  });
  return EachEffort;
};