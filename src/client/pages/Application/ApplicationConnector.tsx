import React, { FC, useState, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { Application } from '../../../server/applications/entities';
import { ErrorData } from '../../../server/types/ErrorResponse';
import { User } from '../../../server/users/entities';
import { Vehicle } from '../../../server/vehicles/entities';

import {ApplicationPage} from './ApplicationPage';


export const ApplicationConnector: FC = () => {
    let { applicationId } = useParams();

    const [application, setApplication] = useState<Application | undefined>();
    const [applicationErrors, setApplicationErrors] = useState<ErrorData[]>([]);

    const GetApplication = async() => {
        try {
            const res = await fetch(`/api/applications/${applicationId}`);
            if (res.status === 200) {
                const resData = await res.json();
                setApplication(resData.application);
            } else {
                return redirect("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const UpdateApplication = async() => {
        try {
            const res = await fetch(
                `/api/applications/${applicationId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(application),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                const resData = await res.json();
                setApplication(resData.application);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ValidateApplication = async() => {
        try {
            const res = await fetch(
                `/api/applications/${applicationId}/validate`,
                {
                    method: "POST"
                }
            );
            if (res.status === 400) {
                const resData = await res.json();
                setApplicationErrors(resData.data);
            } else {
                setApplicationErrors([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const CreateUser = async() => {
        if (application === undefined)
            return;

        try {
            const res = await fetch(
                `/api/applications/${applicationId}/users`,
                {
                    method: "POST"
                }
            );
            if (res.status === 200) {
                const resData = await res.json();
                const newUser = resData.user;
                const users: User[] = application.users.concat([newUser])
                setApplication({...application, users: users});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const CreateVehicle = async() => {
        if (application === undefined)
            return;

        try {
            const res = await fetch(
                `/api/applications/${applicationId}/vehicles`,
                {
                    method: "POST"
                }
            );
            if (res.status === 200) {
                const resData = await res.json();
                const newVehicle = resData.vehicle;
                const vehicles: Vehicle[] = application.vehicles.concat([newVehicle])
                setApplication({...application, vehicles: vehicles});
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetApplication();
	}, []);

    return (
        <>
            {application === undefined ? (
                <div>Loading</div>
            ) : (
                <>
                    <ApplicationPage
                        application={application}
                        setApplication={setApplication}
                        CreateUser={CreateUser}
                        CreateVehicle={CreateVehicle}
                        applicationErrors={applicationErrors}
                    />

                    <div className='container-fluid mt-5'>
                        <button
                            type="button" className="btn btn-outline-primary mb-3"
                            onClick={() => UpdateApplication()}
                        >
                            Save Changes
                        </button>
                        <button
                            type="button" className="btn btn-outline-primary mb-3"
                            onClick={async () => {
                                await UpdateApplication();
                                await ValidateApplication();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
