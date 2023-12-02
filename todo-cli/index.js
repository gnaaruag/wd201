const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "second item",
      dueDate: new Date(),
      complete: false,
    });
    console.log(`created todo item with id ${todo.id}`);
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await createTodo();
})();
