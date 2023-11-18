/* eslint-disable no-undef */
const todo = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todo();

describe("Todo List test suite", () => {
  beforeAll(() => {
    const date = new Date().toISOString();
    add({
      title: "todo test 1",
      completed: false,
      dueDate: date,
    });
    add({
      title: "todo test 2",
      completed: false,
      dueDate: date,
    });
    add({
      title: "todo test 3",
      completed: false,
      dueDate: date,
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
  test("test for checking overdue items retrieval", () => {
    const testOverdueArray = overdue();
    expect(testOverdueArray.length).toBe(0);
  });
  test("test for checking overdue items retrieval", () => {
    const testDueToday = dueToday();
    expect(testDueToday.length).toBe(0);
  });
  test("test for checking overdue items retrieval", () => {
    const testDueLater = dueLater();
    expect(testDueLater.length).toBe(4);
  });
});
