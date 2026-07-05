import { Request, Response } from "express";
import { pool } from "../db/db";

export async function getNotes(req: Request, res: Response): Promise<void> {
    try {
        const notes = await pool.query("SELECT * FROM notes");
        res.json(notes.rows);
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: "Internal Server Error",})
    }
}

export async function createNote(req: Request, res: Response): Promise<void> {
    try {
        const { title, content } = req.body;

        const result = await pool.query(
            "INSERT INTO notes(title,content) VALUES($1,$2) RETURNING *",
            [title, content]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}
