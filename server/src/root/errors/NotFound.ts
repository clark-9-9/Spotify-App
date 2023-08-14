import { Request, Response } from "express";

function NotFound (req: Request, res: Response) {
    return res.send("The Route not Found");
}

export default NotFound;