import {Request, Response, Router} from "express";

import { ErrorResponse } from "../types/ErrorResponse";
import { CreateUser, DeleteUser } from "./controller";
import { User } from "./entities";

const router = Router();

router.post("/applications/:applicationId/users", async (req: Request, res: Response) => {
    try {
        const user: User = await CreateUser(Number(req.params.applicationId), req.body);
        return res.status(200).json({"user": user});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

router.delete("/users/:userId", async (req: Request, res: Response) => {
    try {
        await DeleteUser(Number(req.params.userId));
        return res.status(200).json({});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

export default router;
