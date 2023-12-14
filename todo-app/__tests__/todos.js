const request = require("supertest");
const cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;

// eslint-disable-next-line no-unused-vars
function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

describe("Todo Application", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const res = await agent
      .post("/todos")
      .set("Accept", "application/json")
      .send({
        title: "Buy milk",
        dueDate: new Date().toISOString(),
        completed: false,
      });

    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toMatch("application/json");
    const parsedResponse = JSON.parse(res.text);
    expect(parsedResponse.id).toBe(1);
  });

  test("Marks a todo with the given ID as complete", async () => {
    const createResponse = await agent
      .post("/todos")
      .set("Accept", "application/json")
      .send({
        title: "Go home for vacation",
        dueDate: new Date().toISOString(),
        completed: false,
      });

    const todoID = createResponse.body.id;
    expect(createResponse.body.completed).toBe(false);

    const checkRemovalOfCompleted = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({
        completed: false,
      });
    const parsedCheckdeletion = checkRemovalOfCompleted.body;
    expect(parsedCheckdeletion.completed).toBe(true);
    const checkAdditionOfCompleted = await agent
      .put(`/todos/${todoID}`)
      .set("Accept", "application/json")
      .send({
        completed: true,
      });

    const parsedCheckAddtion = checkAdditionOfCompleted.body;
    expect(parsedCheckAddtion.completed).toBe(false);
  });

  test("deletes a todo with given id via the /todos/{id} endpoint using DELETE method", async () => {
    const res = await agent
      .post("/todos")
      .set("Accept", "application/json")
      .send({
        title: "pay utilities",
        dueDate: new Date().toISOString(),
        completed: false,
      });

    expect(res.statusCode).toBe(200);
    expect(res.header["content-type"]).toMatch("application/json");

    const parsedResponse = JSON.parse(res.text);
    const todoID = parsedResponse.id;
    const response = await agent.delete(`/todos/${todoID}`);
    const parsedResponses = JSON.parse(response.text);
    expect(parsedResponses).toBe(true);
  });
});

/* // const request = require("supertest");

// const db = require("../models/index");
// const app = require("../app");

// let server, agent;

// describe("Todo Application", function () {
//   beforeAll(async () => {
//     await db.sequelize.sync({ force: true });
//     server = app.listen(3000, () => {});
//     agent = request.agent(server);
//   });

//   afterAll(async () => {
//     try {
//       await db.sequelize.close();
//       await server.close();
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   test("Creates a todo and responds with JSON at /todos POST endpoint", async () => {
//     const res = await agent
//       .post("/todos")
//       .set("Accept", "application/json")
//       .send({
//         title: "Buy milk",
//         dueDate: new Date().toISOString(),
//         completed: false,
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.header["content-type"]).toMatch(/application\/json/);
//     const parsedResponse = JSON.parse(res.text);
//     expect(parsedResponse.id).toBeDefined();
//   });

//   test("Marks a todo with the given ID as complete", async () => {
//     const createResponse = await agent
//       .post("/todos")
//       .set("Accept", "application/json")
//       .send({
//         title: "Buy milk",
//         dueDate: new Date().toISOString(),
//         completed: false,
//       });

//     const todoID = createResponse.body.id;
//     expect(createResponse.body.completed).toBe(false);

//     const checkRemovalOfCompleted = await agent
//       .put(`/todos/${todoID}`)
//       .set("Accept", "application/json")
//       .send({
//         completed: false,
//       });
//     const parsedCheckdeletion = checkRemovalOfCompleted.body;
//     expect(parsedCheckdeletion.completed).toBe(true);
//     const checkAdditionOfCompleted = await agent
//       .put(`/todos/${todoID}`)
//       .set("Accept", "application/json")
//       .send({
//         completed: true,
//       });

//     const parsedCheckAddtion = checkAdditionOfCompleted.body;
//     expect(parsedCheckAddtion.completed).toBe(false);
//   });

//   test("Fetches all todos in the database using /todos endpoint", async () => {
//     await agent.post("/todos").send({
//       title: "Buy xbox",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     await agent.post("/todos").send({
//       title: "Buy ps3",
//       dueDate: new Date().toISOString(),
//       completed: false,
//     });
//     const res = await agent.get("/todos");
//     const parsedResponse = JSON.parse(res.text);

//     expect(parsedResponse.length).toBe(4);
//     expect(parsedResponse[3]["title"]).toBe("Buy ps3");
//   });

//   test("Deletes a todo with the given ID if it exists and sends a boolean res", async () => {
//     const res = await agent
//       .post("/todos")
//       .set("Accept", "application/json")
//       .send({
//         title: "Buy milk",
//         dueDate: new Date().toISOString(),
//         completed: false,
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.header["content-type"]).toMatch(/application\/json/);

//     const parsedResponse = JSON.parse(res.text);
//     const todoID = parsedResponse.id;
//     const response = await agent.delete(`/todos/${todoID}`);
//     const parsedResponses = JSON.parse(response.text);
//     expect(parsedResponses).toBe(true);
//   });
// }); */
