import {AppDataSource} from "../db/index";

import { ErrorData, ErrorDataEntities } from "../types/ErrorResponse";
import { ValidateUser } from "../users/controller";
import { ValidateVehicle } from "../vehicles/controller";
import { Application } from "./entities";
import { ApplicationDataError, ApplicationNotFoundError, ApplicationType } from "./types";


export const GetApplicationById = async (id: number) : Promise<Application> => {
	const applicationRepository = AppDataSource.getRepository(Application);
	const application: Application | null = await applicationRepository.findOneBy({ id: id });

	if (application === null)
		throw new ApplicationNotFoundError();

	return application;
}

export const CreateApplication = async (applicationData: ApplicationType) : Promise<Application> => {
	const applicationRepository = AppDataSource.getRepository(Application);
	const application: Application = applicationRepository.create({
		...applicationData
	});
	return await applicationRepository.save(application);
}

export const UpdateApplication = async (id: number, applicationData: Application) : Promise<Application> => {
	const application: Application = await GetApplicationById(id);

	const applicationRepository = AppDataSource.getRepository(Application);
	return await applicationRepository.save({
		...application,
		...applicationData
	});
}

export const ValidateApplication = async (id: number) => {
	const application: Application = await GetApplicationById(id);

	let errorData : ErrorData[] = [];

	if (application.users.length === 0)
		errorData.push({
			type: ErrorDataEntities.APPLICATION,
			id: application.id,
			field: "users",
			error: "At least one person must be on the plan"
		});

	if (application.vehicles.length === 0)
		errorData.push({
			type: ErrorDataEntities.APPLICATION,
			id: application.id,
			field: "vehicles",
			error: "At least one vehicle must be on the plan"
		});
	if (application.vehicles.length > 3)
		errorData.push({
			type: ErrorDataEntities.APPLICATION,
			id: application.id,
			field: "vehicles",
			error: "No more than 3 vehicles may be on the plan"
		});

	application.users.forEach(user => {
		const userErrors : ErrorData[] = ValidateUser(user);
		errorData = errorData.concat(userErrors);
	});
	application.vehicles.forEach(vehicle => {
		const vehicleErrors : ErrorData[] = ValidateVehicle(vehicle);
		errorData = errorData.concat(vehicleErrors);
	});
	
	if (errorData.length > 0)
		throw new ApplicationDataError(errorData);
	
	return;
}
