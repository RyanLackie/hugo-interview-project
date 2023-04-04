import React, { FC } from 'react';

import { ErrorDataEntities } from '../../../server/types/ErrorResponse';
import { ApplicationProps } from './types';
import { UserInputConnector } from './UserInput/UserInputConnector';
import { VehicleInputConnector } from './VehicleInput/VehicleInputConnector';


export const ApplicationPage: FC<ApplicationProps> = ({application, setApplication, CreateUser, CreateVehicle, applicationErrors}) => {

	return (
		<div>
			<div>
				{applicationErrors.map(entry => (
					<>
						{entry.type === ErrorDataEntities.APPLICATION && (
							<div className="alert alert-danger" role="alert">
								{entry.error}
							</div>
						)}
					</>
				))}
			</div>

			<div className='container-fluid mb-5'>
				<h2>
					People On Your Plan
				</h2>
				<button
					type="button" className="btn btn-outline-success mb-3"
					onClick={() => CreateUser()}
				>
					Add User
				</button>
				<div className="d-flex" style={{flexWrap: "wrap"}}>
					{application.users.map((user, index) => {
						return (
							<div key={`user-${user.id}`}>
								<UserInputConnector
									user={user}
									index={index}
									application={application}
									setApplication={setApplication}
									userErrors={
										applicationErrors.filter(entry =>
											entry.type === ErrorDataEntities.USER &&
											entry.id === user.id
										)
									}
								/>
							</div>
						)
					})}
				</div>
			</div>
			
			<div className='container-fluid'>
				<h2>
					Vehicles On Your Plan
				</h2>
				{application.vehicles.length < 3 && (
					<button
						type="button" className="btn btn-outline-success mb-3"
						onClick={() => CreateVehicle()}
					>
						Add Vehicle
					</button>
				)}
				<div className="d-flex" style={{flexWrap: "wrap"}}>
					{application.vehicles.map(vehicle => {
						return (
							<div
								key={`vehicle-${vehicle.id}`}
								className="mb-2"
							>
								<VehicleInputConnector
									vehicle={vehicle}
									application={application}
									setApplication={setApplication}
									vehicleErrors={
										applicationErrors.filter(entry =>
											entry.type === ErrorDataEntities.VEHICLE &&
											entry.id === vehicle.id
										)
									}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
};
