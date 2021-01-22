"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Defense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Defense.hasMany(models.Definition_Junction, {
        foreignKey: "defenseid",
      });
      Defense.belongsTo(models.Definition, {
        foreignKey: "definitionid",
      });
      Defense.hasMany(models.Suggestion, {
        foreignKey: "defenseid",
      });
    }
  }
  Defense.init(
    {
      steps: DataTypes.STRING,
      definitionid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Defense",
    }
  );
  return Defense;
};
