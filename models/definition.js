"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Definition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Definition.hasMany(models.Defense, {
        foreignKey: "definitionid",
      });
      Definition.hasMany(models.Attack, {
        foreignKey: "definitionid",
      });
      Definition.hasMany(models.Definition_Junction, {
        foreignKey: "definitionid",
      });
      Definition.hasMany(models.Suggestion, {
        foreignKey: "definitionid",
      });
    }
  }
  Definition.init(
    {
      title: DataTypes.STRING,
      explanation: DataTypes.STRING,
      vulnerability: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Definition",
    }
  );
  return Definition;
};
