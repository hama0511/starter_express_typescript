import request from "supertest";
import main from "../src/main";

describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(main).get("/api")
            .expect(200);
    });
});
