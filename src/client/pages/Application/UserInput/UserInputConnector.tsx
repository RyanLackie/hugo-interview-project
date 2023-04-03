import React, { FC } from 'react';

import { User } from '../../../../server/users/entities';
import { UserInputConnectorProps } from './types';
import { UserInput } from './UserInput';


export const UserInputConnector: FC<UserInputConnectorProps> = ({user, application, setApplication, userErrors}) => {
    const DeleteUser = async() => {
        try {
            const res = await fetch(
                `/api/users/${user.id}`,
                {
                    method: "DELETE",
                }
            );
            if (res.status === 200) {
                const users: User[] = application.users.filter(entry => entry.id !== user.id);
			    setApplication({...application, users: users});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const SetUser = async(userData: User) => {
        const newUsers = application.users.map(entry => {
            if (entry.id === user.id)
                entry = userData;
            return entry;
        });
        setApplication({...application, users: newUsers});
    }

    return (
        <>
            {user === undefined ? (
                <div>Loading</div>
            ) : (
                <UserInput
                    user={user}
                    SetUser={SetUser}
                    DeleteUser={DeleteUser}
                    userErrors={userErrors}
                />
            )}
        </>
    )
}
