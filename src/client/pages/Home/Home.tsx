import React, { FC } from 'react';

import "./Home.scss";
import { HomeProps } from './types';


export const Home: FC<HomeProps> = ({CreateApplication}) => {

	return (
		<>
			<h1>
				Welcome!
			</h1>

			<div>
				Would you like to start an application?
			</div>
			<button
				type="button" className="btn btn-primary"
				onClick={() => CreateApplication()}
			>
				Start Application
			</button>
		</>
	);
};
