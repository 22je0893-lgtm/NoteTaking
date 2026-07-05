import express from "express";
import notesRoutes from "./routes/notesRoutes";
import rootRoutes from "./routes/rootRoutes";

const app = express();

app.use(express.json());
app.use("/", rootRoutes);
app.use("/api/notes", notesRoutes);

export default app;
