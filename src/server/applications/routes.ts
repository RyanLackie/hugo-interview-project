import {Request, Response, Router} from "express";
import { ErrorResponse } from "../types/ErrorResponse";

import {CreateApplication, GetApplicationById, UpdateApplication, ValidateApplication} from "./controller";
import { Application } from "./entities";

const router = Router();

router.get("/applications/:applicationId", async (req: Request, res: Response) => {
    try {
        const application: Application = await GetApplicationById(Number(req.params.applicationId));
        return res.status(200).json({"application": application});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

router.post("/applications/:applicationId/validate", async (req: Request, res: Response) => {
    try {
        await ValidateApplication(Number(req.params.applicationId));
        return res.status(200).json({"amount": 200});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

router.post("/applications", async (req: Request, res: Response) => {
    try {
        const application: Application = await CreateApplication(req.body);
        return res.status(200).json({"resumeRoute": `http://${req.headers.host}/applications/${application.id}`});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

router.put("/applications/:applicationId", async (req: Request, res: Response) => {
    try {
        const application: Application = await UpdateApplication(Number(req.params.applicationId), req.body);
        return res.status(200).json({"application": application});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

export default router;
