import { Request, Response } from "express";

export function getRoot(req: Request, res: Response): void {
    res.send("Hello, this is the root/main route!");
}
