import {Request, Response, Router} from "express";

import { ErrorResponse } from "../types/ErrorResponse";
import { CreateVehicle, DeleteVehicle } from "./controller";
import { Vehicle } from "./entities";

const router = Router();

router.post("/applications/:applicationId/vehicles", async (req: Request, res: Response) => {
    try {
        const vehicle: Vehicle = await CreateVehicle(Number(req.params.applicationId), req.body);
        return res.status(200).json({"vehicle": vehicle});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

router.delete("/vehicles/:vehicleId", async (req: Request, res: Response) => {
    try {
        await DeleteVehicle(Number(req.params.vehicleId));
        return res.status(200).json({});

    } catch (error) {
        return res.status((error as ErrorResponse).status).json({
            "message": (error as ErrorResponse).message,
            "data": (error as ErrorResponse).data
        });
    }
});

export default router;
