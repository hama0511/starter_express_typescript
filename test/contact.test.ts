import request from "supertest";
import main from "../src/main";
import { expect} from "chai";

describe("GET /contact", () => {
    it("should return 200 OK", (done) => {
        request(main).get("/contact")
            .expect(200, done);
    });
});


describe("POST /contact", () => {
    it("should return false from assert when no message is found", (done) => {
        request(main).post("/contact")
            .field("name", "John Doe")
            .field("email", "john@me.com")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);

    });
});