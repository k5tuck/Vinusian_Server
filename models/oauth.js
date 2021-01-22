"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OAuth.belongsTo(models.User, {
        foreignKey: "userid",
      });
    }
  }
  OAuth.init(
    {
      platformid: DataTypes.STRING,
      platform: DataTypes.STRING,
      userid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OAuth",
    }
  );
  return OAuth;
};
