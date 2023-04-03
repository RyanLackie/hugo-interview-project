import React, { FC } from 'react';

import { VehicleInputProps } from './types';


export const VehicleInput: FC<VehicleInputProps> = ({vehicle, SetVehicle, DeleteVehicle, vehicleErrors}) => {

	return (
		<>
			{vehicle === undefined ? (
				<div>Loading</div>
			) : (
				<div className="bg-light p-3" style={{maxWidth: "300px", marginRight: "5px"}}>
					<div>
						<label>
							VIN
						</label>
						<br />
						<input
							className={`form-control ${vehicleErrors.find(entry => entry.field === "vin") ? 'is-invalid' : ''}`}
							value={vehicle.vin}
							onChange={(e) => SetVehicle({...vehicle, vin: e.target.value})}
						/>
						<div className="invalid-feedback">
							{vehicleErrors.find(entry => entry.field === 'vin')?.error}
						</div>
					</div>
					<div>
						<label>
							Year
						</label>
						<br />
						<input
							className={`form-control ${vehicleErrors.find(entry => entry.field === "year") ? 'is-invalid' : ''}`}
							type="number"
							value={vehicle.year}
							onChange={(e) => SetVehicle({...vehicle, year: e.target.value ? Number(e.target.value) : null})}
						/>
						<div className="invalid-feedback">
							{vehicleErrors.find(entry => entry.field === 'year')?.error}
						</div>
					</div>
					<div>
						<label>
							Make
						</label>
						<br />
						<input
							className={`form-control ${vehicleErrors.find(entry => entry.field === "make") ? 'is-invalid' : ''}`}
							value={vehicle.make}
							onChange={(e) => SetVehicle({...vehicle, make: e.target.value})}
						/>
						<div className="invalid-feedback">
							{vehicleErrors.find(entry => entry.field === 'make')?.error}
						</div>
					</div>
					<div>
						<label>
							Model
						</label>
						<br />
						<input
							className={`form-control ${vehicleErrors.find(entry => entry.field === "model") ? 'is-invalid' : ''}`}
							value={vehicle.model}
							onChange={(e) => SetVehicle({...vehicle, model: e.target.value})}
						/>
						<div className="invalid-feedback">
							{vehicleErrors.find(entry => entry.field === 'model')?.error}
						</div>
					</div>

					<button
						type="button" className="btn btn-outline-danger w-100 mt-3"
						onClick={() => DeleteVehicle()}
					>
						Remove
					</button>
				</div>
			)}
		</>
	);
};
