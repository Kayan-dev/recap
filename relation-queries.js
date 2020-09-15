const { user, todoItem, todoList } = require("./models");

async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [user],
  });

  return lists.map((list) => list.get({ plain: true }));
}

/*
If you only want to include the users name
*/

// async function listsWithUsers() {
//   try {
//     const lists = await todoList.findAll({
//       include: [{ model: user, attributes: ["email"] }],
//     });
//     return lists.map((list) => list.get({ plain: true }));
//   } catch (e) {
//     console.error(e);
//   }
// }

// listsWithUsers().then((lists) => console.log(lists));

/*
Get the list of each user 
*/

// async function getUsers() {
//   const allUsers = await user.findAll({
//     include: { model: todoList, attributes: ["id"] },
//   });
//   return allUsers.map((user) => user.get({ plain: true }));
// }

// getUsers().then((users) => console.log(users));

/*
Get items from users' lists
*/

async function getItems() {
  const item = await todoItem.findByPk(2, {
    include: { model: todoList },
  });
  // return allItems.map((item) => item.get({ plain: true }));
  return item.get({ plain: true });
}

getItems().then((items) => console.log(items));
