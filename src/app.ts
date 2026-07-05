import express from "express";
import { pool } from "./db/db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, this is the root/main route!");
});

app.get("/api/notes", async (req, res) => {
    try {
        const notes = await pool.query("SELECT * FROM notes");
        res.json(notes.rows);
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: "Internal Server Error",})

    }
});

app.post("/api/notes", async (req, res) => {
    try {
        const { title, content } = req.body;
    
        const result = await pool.query(
            "INSERT INTO notes(title,content) VALUES($1, $2) RETURNING *",
            [title, content]
        );
    
        res.status(201).json(result.rows[0]);
        
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
});

export default app;