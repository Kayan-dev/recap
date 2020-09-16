const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
app.use(cors());

const {
  user: User,
  todoList: TodoList,
  tag: Tag,
  itemTag: ItemTag,
} = require("./models");

app.use(express.json());

// start listening on port 4000
app.listen(PORT, onListen);

//This is a test function
app.post("/echo", (req, res) => {
  console.log("i got a request!!!");
  res.json(req.body);
});

//Get the data from all users
app.get("/users", async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
});

//Get the data from all tags
app.get("/tags", async (req, res, next) => {
  const tags = await Tag.findAll();
  res.json(tags);
});

//Get the data from all itemTags
app.get("/ItemTags", async (req, res, next) => {
  const itemtags = await ItemTag.findAll();
  res.json(itemtags);
});

//Get the data of a specific itemTags Id
app.get("/ItemTags/:itemTagId", async (req, res, next) => {
  const itemTagId = parseInt(req.params.itemTagId);
  const itemtags = await ItemTag.findByPk(itemTagId);
  res.json(itemtags);
});

// Add something new for a specific itemTags id
app.put("/ItemTags/:itemTagId", async (req, res, next) => {
  try {
    const itemTagId = parseInt(req.params.itemTagId);
    const itemToUpdate = await ItemTag.findByPk(itemTagId);
    if (!itemToUpdate) {
      res.status(404).send("Item Tag not found");
    } else {
      const tagId = parseInt(req.body.tagId);
      const updatedList = await itemToUpdate.update({ itemTagId, tagId });
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

// Create a new user account
app.post("/users", async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create({ email, phone });
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

// Finding user account with userId
app.get("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

// Updating user account
app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

// Read the user's lists / Finding user account with corresponding todolist (id)
app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const newList = await TodoList.create({ userId, ...req.body });
      res.json(newList);
    }
  } catch (e) {
    next(e);
  }
});

// Update an existing list
app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toUpdate = await TodoList.findByPk(listId);
    if (!toUpdate) {
      res.status(404).send("List not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
});

// Delete user itself
app.delete("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const toDelete = await User.findByPk(userId);
    if (!toDelete) {
      res.status(404).send("User not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

// Delete a user's specific list
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toDelete = await TodoList.findByPk(listId);
    if (!toDelete) {
      res.status(404).send("List not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});
// Delete all user's lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.todoLists.forEach(async (list) => await list.destroy());
      res.status(204).send();
    }
  } catch (e) {
    next(e);
  }
});
//Get the data from the todolists
app.get("/todoLists", async (req, res, next) => {
  const todoLists = await TodoList.findAll();
  res.json(todoLists);
});
// Post something new in the todolists
app.post("/todoLists", async (req, res, next) => {
  try {
    const newList = await TodoList.create(req.body);
    res.json(newList);
  } catch (e) {
    next(e);
  }
});

// When you want to update something, for example listId 6 attribute name=NULL, so http PUT :4000/todoLists/6 name=testing
app.put("/todoLists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

// confirmation function
function onListen() {
  console.log(`Listening on :${PORT}`);
}
