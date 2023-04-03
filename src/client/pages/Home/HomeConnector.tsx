import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {Home} from './Home';


export const HomeConnector: FC = () => {
    const navigate = useNavigate();

    const CreateApplication = async() => {
        try {
            const res = await fetch(
                `/api/applications`, {
                    method: "POST",
                    body: JSON.stringify({})
                }
            );
            if (res.status === 200) {
                const resData = await res.json();
                const applicationPath = resData.resumeRoute.replace(window.location.href, '');
                return navigate(applicationPath);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Home CreateApplication={CreateApplication} />
    )
}
