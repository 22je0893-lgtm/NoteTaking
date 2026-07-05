import request from "supertest";
import app from "../app";
import { pool } from "../db/db";

jest.mock("../db/db");

describe("Notes API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/notes", () => {
    it("should return all notes", async () => {
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "Test",
            content: "Hello World",
          },
        ],
      });

      const res = await request(app).get("/api/notes");

      expect(res.status).toBe(200);

      expect(res.body).toEqual([
        {
          id: 1,
          title: "Test",
          content: "Hello World",
        },
      ]);

      expect(pool.query).toHaveBeenCalledTimes(1);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM notes"
      );
    });

    it("should return 500 if database fails", async () => {
      (pool.query as jest.Mock).mockRejectedValue(
        new Error("Database Error")
      );

      const res = await request(app).get("/api/notes");

      expect(res.status).toBe(500);

      expect(res.body).toEqual({
        message: "Internal Server Error",
      });
    });
  });

  describe("POST /api/notes", () => {
    it("should create a note", async () => {
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [
          {
            id: 1,
            title: "Shopping",
            content: "Buy Milk",
          },
        ],
      });

      const res = await request(app)
        .post("/api/notes")
        .send({
          title: "Shopping",
          content: "Buy Milk",
        });

      expect(res.status).toBe(201);

      expect(res.body).toEqual({
        id: 1,
        title: "Shopping",
        content: "Buy Milk",
      });

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO notes(title,content) VALUES($1,$2) RETURNING *",
        ["Shopping", "Buy Milk"]
      );
    });

    it("should return 500 if insert fails", async () => {
      (pool.query as jest.Mock).mockRejectedValue(
        new Error("Insert Failed")
      );

      const res = await request(app)
        .post("/api/notes")
        .send({
          title: "Shopping",
          content: "Buy Milk",
        });

      expect(res.status).toBe(500);

      expect(res.body).toEqual({
        message: "Internal Server Error",
      });
    });
  });
});