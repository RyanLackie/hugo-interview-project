import dayjs from "dayjs";

import { Application } from "../applications/entities";
import { ApplicationNotFoundError } from "../applications/types";
import { AppDataSource } from "../db";
import { ErrorData, ErrorDataEntities } from "../types/ErrorResponse";
import { Vehicle } from "./entities";
import { VehicleNotFoundError } from "./types";


export const CreateVehicle = async (applicationId: number, vehicleData: Vehicle) : Promise<Vehicle> => {
	const applicationRepository = AppDataSource.getRepository(Application);
	const application = await applicationRepository.findOneBy({ id: applicationId });

	if (application === null)
		throw new ApplicationNotFoundError();

	const vehicleRepository = AppDataSource.getRepository(Vehicle);
	let vehicle: Vehicle = vehicleRepository.create({
		...vehicleData,
		application: application
	});
	return await vehicleRepository.save(vehicle);
}

export const DeleteVehicle = async (vehicleId: number) : Promise<Vehicle> => {
	const vehicleRepository = AppDataSource.getRepository(Vehicle);
	const vehicle = await vehicleRepository.findOneBy({ id: vehicleId });

	if (vehicle == null)
		throw new VehicleNotFoundError();

	return await vehicleRepository.remove(vehicle);
}

export const ValidateVehicle = (vehicle: Vehicle) : ErrorData[] => {
	let errors : ErrorData[] = [];
	
	if (vehicle.vin === "")
		errors.push({
			type: ErrorDataEntities.VEHICLE,
			id: vehicle.id,
			field: "vin",
			error: "Vin is needed"
		});


	if (vehicle.year === null)
		errors.push({
			type: ErrorDataEntities.VEHICLE,
			id: vehicle.id,
			field: "year",
			error: "Year is needed"
		});

	if (vehicle.year === null)
		errors.push({
			type: ErrorDataEntities.VEHICLE,
			id: vehicle.id,
			field: "year",
			error: "Year is needed"
		});
	else if (vehicle.year < 1985 || vehicle.year > dayjs().year()+1)
		errors.push({
			type: ErrorDataEntities.VEHICLE,
			id: vehicle.id,
			field: "year",
			error: `Year must be between 1985 and ${dayjs().year()+1}`
		});

	if (vehicle.make === "")
		errors.push({
			type: ErrorDataEntities.VEHICLE,
			id: vehicle.id,
			field: "make",
			error: "Make is needed"
		});
	
	if (vehicle.model === "")
		errors.push({
			type: ErrorDataEntities.VEHICLE,
			id: vehicle.id,
			field: "model",
			error: "Model is needed"
		});

	return errors;
}
