import request from "supertest";
import main from "../src/main";

describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(main).get("/reset")
            .expect(404, done);
    });
});
