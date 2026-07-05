import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should return hello", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello, this is the root/main route!");
  });
});