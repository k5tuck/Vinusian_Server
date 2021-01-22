"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Definition_Junction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Definition_Junction.belongsTo(models.Definition, {
        foreignKey: "definitionid",
      });
      Definition_Junction.belongsTo(models.Defense, {
        foreignKey: "defenseid",
      });
      Definition_Junction.belongsTo(models.Attack, {
        foreignKey: "attackid",
      });
    }
  }
  Definition_Junction.init(
    {
      definitionid: DataTypes.INTEGER,
      attackid: DataTypes.INTEGER,
      defenseid: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Definition_Junction",
    }
  );
  return Definition_Junction;
};
