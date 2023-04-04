import React, { FC } from 'react';
import dayjs from 'dayjs';

import { UserInputProps } from './types';
import { Relationship } from '../../../../server/users/entities';


export const UserInput: FC<UserInputProps> = ({user, index, SetUser, DeleteUser, userErrors}) => {

	return (
		<>
			{user === undefined ? (
				<div>Loading</div>
			) : (
				<div className="bg-light p-3" style={{maxWidth: "300px", marginRight: "5px"}}>
					<div>
						<label>
							First Name
						</label>
						<br />
						<input
							className={`form-control ${userErrors.find(entry => entry.field === "firstName") ? 'is-invalid' : ''}`}
							value={user.firstName}
							onChange={(e) => SetUser({...user, firstName: e.target.value})}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'firstName')?.error}
						</div>
					</div>
					<div>
						<label>
							Last Name
						</label>
						<br />
						<input
							className={`form-control ${userErrors.find(entry => entry.field === "lastName") ? 'is-invalid' : ''}`}
							value={user.lastName}
							onChange={(e) => SetUser({...user, lastName: e.target.value})}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'lastName')?.error}
						</div>
					</div>
					<div>
						<label>
							Date Of Birth
						</label>
						<br />
						<input
							type="date"
							className={`form-control ${userErrors.find(entry => entry.field === "dateOfBirth") ? 'is-invalid' : ''}`}
							defaultValue={dayjs(user.dateOfBirth).format("YYYY-MM-DD")}
							onChange={(e) => {
								SetUser({...user, dateOfBirth: new Date(e.target.value)});
								e.target.defaultValue = dayjs(user.dateOfBirth).format("YYYY-MM-DD");
							}}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'dateOfBirth')?.error}
						</div>
					</div>
					<div>
						<label>
							Street
						</label>
						<br />
						<input
							className={`form-control ${userErrors.find(entry => entry.field === "street") ? 'is-invalid' : ''}`}
							value={user.street}
							onChange={(e) => SetUser({...user, street: e.target.value})}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'street')?.error}
						</div>
					</div>
					<div>
						<label>
							City
						</label>
						<br />
						<input
							className={`form-control ${userErrors.find(entry => entry.field === "city") ? 'is-invalid' : ''}`}
							value={user.city}
							onChange={(e) => SetUser({...user, city: e.target.value})}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'city')?.error}
						</div>
					</div>
					<div>
						<label>
							State
						</label>
						<br />
						<input
							className={`form-control ${userErrors.find(entry => entry.field === "state") ? 'is-invalid' : ''}`}
							value={user.state}
							onChange={(e) => SetUser({...user, state: e.target.value})}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'state')?.error}
						</div>
					</div>
					<div>
						<label>
							Zip Code
						</label>
						<br />
						<input
							className={`form-control ${userErrors.find(entry => entry.field === "zipCode") ? 'is-invalid' : ''}`}
							value={user.zipCode}
							pattern="[0-9]{5}"
							onChange={(e) => SetUser({...user, zipCode: e.target.value})}
						/>
						<div className="invalid-feedback">
							{userErrors.find(entry => entry.field === 'zipCode')?.error}
						</div>
					</div>
					{index !== 0 && (
						<div>
							<label>
								Relationship
							</label>
							<br />
							<select
								className={`form-control ${userErrors.find(entry => entry.field === "relationship") ? 'is-invalid' : ''}`}
								value={user.relationship}
								onChange={(e) => SetUser({...user, relationship: e.target.value})}
							>
								<option value={Relationship.FRIEND}>Friend</option>
								<option value={Relationship.PARENT}>Parent</option>
								<option value={Relationship.SIBLING}>Sibling</option>
								<option value={Relationship.SPOUSE}>Spouse</option>
								<option value={Relationship.OTHER}>Other</option>
							</select>
							<div className="invalid-feedback">
								{userErrors.find(entry => entry.field === 'relationship')?.error}
							</div>
						</div>
					)}
					
					<button
						type="button" className="btn btn-outline-danger w-100 mt-3"
						onClick={() => DeleteUser()}
					>
						Remove
					</button>
				</div>
			)}
		</>
	);
};
