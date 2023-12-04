const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { Todo } = require("./models");

app.use(bodyparser.json());

// eslint-disable-next-line no-unused-vars
app.get("/todos", async (request, response) => {
  console.log("request to fetching all todos");

  try {
    const todo = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async (request, response) => {
  console.log(`creating todo for request: ${request.body}`);

  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  // console.log(`updating todo with id: ${request.params.id}`);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updateTodo = await todo.markAsCompleted();
    return response.json(updateTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", async (request, response) => {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const deleteTodo = await Todo.destroy({ where: { id: request.params.id } });
    response.send(deleteTodo ? true : false);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;
