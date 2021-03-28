const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);



it("it should send an email to specified email", async (done) => {
    const response = await request.post("/api/email/sendemail");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Email Sent");
    done();
  });
