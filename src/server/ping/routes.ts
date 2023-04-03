import {Request, Response, Router} from "express";

const router = Router();

router.get("/ping", async (req: Request, res: Response) => {
    return res.status(200).json("Pong");
});

export default router;
