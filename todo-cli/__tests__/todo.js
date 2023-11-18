/* eslint-disable no-undef */
const todo = require("../todo");

const { all, markAsComplete, add } = todo();

describe("Todo List test suite", () => {
  beforeAll(() => {
    add({
      title: "todo test 1",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    add({
      title: "todo test 2",
      completed: false,
      dueDate: new Date().toISOString(),
    });
  });

  test("test for adding a new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "todo test some x",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("test for mark todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
