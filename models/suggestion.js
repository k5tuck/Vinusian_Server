"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Suggestion.belongsTo(models.Definition, {
        foreignKey: "definitionid",
      });
      Suggestion.belongsTo(models.User, {
        foreignKey: "userid",
      });
      Suggestion.belongsTo(models.Attack, {
        foreignKey: "attackid",
      });
      Suggestion.belongsTo(models.Defense, {
        foreignKey: "defenseid",
      });
    }
  }
  Suggestion.init(
    {
      definitionid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      attackid: DataTypes.INTEGER,
      defenseid: DataTypes.INTEGER,
      definitionsuggestion: DataTypes.STRING,
      attacksuggestion: DataTypes.STRING,
      defensesuggestion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suggestion",
    }
  );
  return Suggestion;
};
