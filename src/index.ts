import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { pool } from "./db/db";

const app =express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, this is the root/main route!');
});

app.get("/api/notes",async (req,res)=>{
  const notes =await pool.query("SELECT * FROM notes");
  res.json(notes.rows);
})
app.post("/api/notes",async (req,res)=>{
  const {title,content}=req.body
  const sql="INSERT INTO notes (title,content) values ($1,$2)"

  const result=await pool.query(sql,[title,content]);

  res.json(result.rows)
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });