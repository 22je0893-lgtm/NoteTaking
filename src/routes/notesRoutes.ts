import { Router } from "express";
import { createNote, getNotes } from "../controllers/notesController";
import { validateBody } from "../middleware/validateBody";
import { createNoteSchema } from "../schemas/noteSchemas";

const router = Router();

router.get("/", getNotes);
router.post("/", validateBody(createNoteSchema), createNote);

export default router;
