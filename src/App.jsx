import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from './config/routes.config';
import { Login, Dashboard, Report, ReportDetail, Admin, NotFound } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@fontsource/ibm-plex-sans";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTE_PATH.LOGIN} element={<Login />} />
					<Route path={ROUTE_PATH.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTE_PATH.REPORT} element={<Report />} />
					<Route path={ROUTE_PATH.REPORT_DETAIL} element={<ReportDetail />} />
					<Route path={ROUTE_PATH.ADMIN} element={<Admin />} />
					<Route path={ROUTE_PATH.NOT_FOUND} element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer pauseOnFocusLoss={false}/>
		</>
	)
};

export default App;
