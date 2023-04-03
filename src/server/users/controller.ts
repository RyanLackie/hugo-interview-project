import dayjs from "dayjs";

import { Application } from "../applications/entities";
import { ApplicationNotFoundError } from "../applications/types";
import {UserNotFoundError} from "./types";
import { AppDataSource } from "../db";
import { User } from "./entities";
import { ErrorData, ErrorDataEntities } from "../types/ErrorResponse";



export const CreateUser = async (applicationId: number, userData: User) : Promise<User> => {
	const applicationRepository = AppDataSource.getRepository(Application);
	const application = await applicationRepository.findOneBy({ id: applicationId });

	if (application === null)
		throw new ApplicationNotFoundError();

	const userRepository = AppDataSource.getRepository(User);
	let user: User = userRepository.create({
		...userData,
		application: application
	});
	return await userRepository.save(user);
}

export const DeleteUser = async (userId: number) : Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOneBy({ id: userId });

	if (user == null)
		throw new UserNotFoundError();

	return await userRepository.remove(user);
}

export const ValidateUser = (user: User) : ErrorData[] => {
	let errors : ErrorData[] = [];
	
	if (user.firstName === "")
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "firstName",
			error: "First name is needed"
		});

		if (user.lastName === "")
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "lastName",
			error: "Last name is needed"
		});

	if (user.dateOfBirth === null)
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "dateOfBirth",
			error: "Date of birth is needed"
		});

	const today = dayjs();
	const yearsOld = today.diff(user.dateOfBirth, 'year');
	if (yearsOld < 16)
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "dateOfBirth",
			error: "Must be at least 16 years old"
		});

	if (user.street === "")
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "street",
			error: "Street is needed"
		});
	
	if (user.city === "")
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "city",
			error: "City is needed"
		});

	if (user.state === "")
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "state",
			error: "State is needed"
		});

	if (user.zipCode === "")
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "zipCode",
			error: "Zip Code is needed"
		});
	else if (!/^\d{5}(-\d{4})?$/.test(user.zipCode))
		errors.push({
			type: ErrorDataEntities.USER,
			id: user.id,
			field: "zipCode",
			error: "Not a valid zip code"
		});

	return errors;
}
