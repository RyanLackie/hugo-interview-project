import React from 'react';
import {
	Route,
	BrowserRouter,
	Routes
} from "react-router-dom";

import "./App.scss";

import { HomeConnector} from "./pages/Home";
import { ApplicationConnector } from './pages/Application';
import { PingConnector} from "./pages/Ping";
import { NotFound} from "./pages/NotFound";


export const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomeConnector />} />
					<Route path="/applications/:applicationId" element={<ApplicationConnector />} />
					<Route path="/ping" element={<PingConnector />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
