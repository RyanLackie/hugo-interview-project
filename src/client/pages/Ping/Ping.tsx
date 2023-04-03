import React from 'react';
import { FC } from 'react';

import "./Ping.scss";
import { PingProps } from './types';


export const Ping: FC<PingProps> = ({ping}) => {
	return (
		<div>
			<h1 className="test">{ping}</h1>
		</div>
	);
};
