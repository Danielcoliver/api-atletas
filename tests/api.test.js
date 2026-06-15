const request = require("supertest");
const app = require("../server");

test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.statusCode).toBe(200);
});
