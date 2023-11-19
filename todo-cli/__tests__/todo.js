/* eslint-disable no-undef */
const todo = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todo();

describe("Todo List test suite", () => {
  beforeAll(() => {
    const dateToday = new Date();
    add({
      title: "todo test 1",
      completed: false,
      dueDate: new Date(new Date().setDate(dateToday.getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "todo test 2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "todo test 3",
      completed: false,
      dueDate: new Date(new Date().setDate(dateToday.getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });

  test("test for adding a new todo", () => {
    expect(all.length).toBe(3);
    add({
      title: "todo test some x",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(4);
  });
  test("test for mark todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("test for checking overdue items retrieval", () => {
    const testOverdueArray = overdue();
    expect(testOverdueArray.length).toBe(1);
  });
  test("test for checking  items due today retrieval", () => {
    const testDueToday = dueToday();
    expect(testDueToday.length).toBe(2);
  });
  test("test for checking items due later retrieval", () => {
    const testDueLater = dueLater();
    expect(testDueLater.length).toBe(1);
  });
});
