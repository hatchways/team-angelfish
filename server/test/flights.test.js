const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);


it("return cities from the skyscanner api", async done =>{
    const response = await request.get("/api/flights/places/:regionId")
    console.log(response)
    expect(response.status).toBe(200);
    done();
})