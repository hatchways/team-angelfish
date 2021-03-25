const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Getting city", () => {
  it("it should return 400", done => {
    chai
      .request(app)
      .post(`/api/cities`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("response")
        done();
      });
  });
});
