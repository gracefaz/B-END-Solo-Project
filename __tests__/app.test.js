const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("GET /api/categories", () => {
  test("200: respond with a json object containing an array of categories objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        const { categories } = res.body;
        expect(res.body).toBeInstanceOf(Object);
        expect(categories).toBeInstanceOf(Array);
        expect(categories.length).toBe(4);
        categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: responds with a Not Found message when passed in a wrong endpoint", () => {
    return request(app)
      .get("/api/categorys")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
});

// describe.only("Error Handling: GET Requests", () => {
//   test("404: responds with a Not Found message when passed in a wrong endpoint", () => {
//     return request(app)
//       .get("/api/categorys")
//       .expect(404)
//       .then((res) => {
//         expect(res.body.message).toBe("Not Found");
//       });
//   });
// });
