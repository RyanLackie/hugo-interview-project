import React, { FC } from 'react';

import { Vehicle } from '../../../../server/vehicles/entities';
import { VehicleInputConnectorProps } from './types';
import { VehicleInput } from './VehicleInput';


export const VehicleInputConnector: FC<VehicleInputConnectorProps> = ({vehicle, application, setApplication, vehicleErrors}) => {
    const DeleteVehicle = async() => {
        try {
            const res = await fetch(
                `/api/vehicles/${vehicle.id}`,
                {
                    method: "DELETE",
                }
            );
            if (res.status === 200) {
                const vehicles: Vehicle[] = application.vehicles.filter(entry => entry.id !== vehicle.id);
			    setApplication({...application, vehicles: vehicles});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const SetVehicle = async(vehicleData: Vehicle) => {
        const newVehicles = application.vehicles.map(entry => {
            if (entry.id === vehicle.id)
                entry = vehicleData;
            return entry;
        });
        setApplication({...application, vehicles: newVehicles});
    }

    return (
        <>
            {vehicle === undefined ? (
                <div>Loading</div>
            ) : (
                <VehicleInput
                    vehicle={vehicle}
                    SetVehicle={SetVehicle}
                    DeleteVehicle={DeleteVehicle}
                    vehicleErrors={vehicleErrors}
                />
            )}
        </>
    )
}
