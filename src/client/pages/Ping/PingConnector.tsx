import React from 'react';
import { FC, useState, useEffect } from 'react';

import {Ping} from './Ping';


export const PingConnector: FC = () => {
    const [ping, setPing] = useState<string>('');

    useEffect(() => {
		const pingServer = async() => {
            try {
                const res = await fetch('/api/ping');
                const resData = await res.json();
                setPing(resData);
            } catch (error) {
                console.log(error);
            }
        }
        pingServer();
	}, []);

    return (
        <Ping ping={ping} />
    )
}
