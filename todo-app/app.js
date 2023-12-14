const express = require("express");
const app = express();
const csurf = require("csurf");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const { Todo } = require("./models");
const path = require("path");

app.use(bodyparser.json());
app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser("sfkdslhhihJHUH"));
// app.use(csurf( { cookie: true } ));

app.get("/", async (request, response) => {
  const allTodos = await Todo.getTodos();
  if (request.accepts("html")) {
    // const overdue = allTodos.filter(item => item.dueDate < new Date().toISOString().slice(0,10));
    const overdue = [];
    const dueToday = [];
    const dueLater = [];
    const completed = [];

    allTodos.map((item) => {
      if (item.completed) {
        completed.push(item);
      } else if (item.dueDate < new Date().toISOString().slice(0, 10)) {
        overdue.push(item);
      } else if (item.dueDate > new Date().toISOString().slice(0, 10)) {
        dueLater.push(item);
      } else {
        dueToday.push(item);
      }
    });

    response.render("index", { overdue, dueToday, dueLater, completed });
  } else {
    response.json({ allTodos });
  }
});

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
  // console.log(`creating todo for request: ${request.body}`);

  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    console.log(todo);
    if (request.accepts("html")) {
      return response.redirect("/");
    } else {
      return response.json(todo);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async (request, response) => {
  // console.log(`updating todo with id: ${request.params.id}`);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updateTodo = await todo.alterCompletion(todo.completed);
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
    // eslint-disable-next-line no-unused-vars
    const deleteTodo = await Todo.remove(request.params.id);
    return response.json(true);
  } catch (err) {
    console.log(err);
    return response.status(422).json(err);
  }
});

module.exports = app;
