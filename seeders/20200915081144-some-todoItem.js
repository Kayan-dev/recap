"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "finish reader",
          deadline: "today",
          createdAt: new Date(),
          updatedAt: new Date(),
          todoListId: 1,
        },
        {
          task: "finish begroting",
          deadline: "till friday",
          createdAt: new Date(),
          updatedAt: new Date(),
          todoListId: 2,
        },
        {
          task: "Go work out at 8pm",
          deadline: "today",
          createdAt: new Date(),
          updatedAt: new Date(),
          todoListId: 2,
        },
        {
          task: "Take the dog out",
          deadline: "at 6 pm",
          createdAt: new Date(),
          updatedAt: new Date(),
          todoListId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
