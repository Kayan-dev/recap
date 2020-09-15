"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("todoItems", "todoListId", {
      type: Sequelize.INTEGER,
      references: {
        model: "todoLists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("todoItems", "todoListId");
  },
};
