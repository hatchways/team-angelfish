const app = require("../app"); 
const supertest = require("supertest");
const request = supertest(app);

it("return specified city from the skyscanner api", async (done) => {
  const response = await request.get("/api/flights/places/:regionId");
  expect(response.status).toBe(200);
  done();
});


