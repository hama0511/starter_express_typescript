import request from "supertest";
import main from "../src/main";

describe("GET /", () => {
    it("should return 200 OK", (done) => {
        request(main).get("/")
            .expect(200, done);
    });
});
