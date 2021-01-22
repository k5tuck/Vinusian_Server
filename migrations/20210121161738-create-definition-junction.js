"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Definition_Junctions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      definitionid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Definitions",
          key: "id",
        },
      },
      attackid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Attacks",
          key: "id",
        },
      },
      defenseid: {
        type: Sequelize.INTEGER,
        references: {
          model: "Defenses",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Definition_Junctions");
  },
};
