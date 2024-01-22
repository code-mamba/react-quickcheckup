import React from "react";
import {Routes, Route} from 'react-router-dom'
import { UserList } from "src/components/pages/UsersList/UserList";
import { Home } from "../components/pages/Home/Home";
import { Login } from "../components/pages/Login/Login";
import { NoMatch } from "../components/pages/NoMatch/NoMatch";
import { AppointmentPage } from "src/components/pages/Appointment/Appointment";
import { authSelector } from "src/redux/slices/authSlices";
import { useSelector } from "react-redux";
import { CreateUser } from "src/components/pages/CreateUser/CreateUser";
import { ADMIN, DOCTOR, PATIENT } from "src/components/Constant/constant";
import { Doctorpage } from "src/components/pages/Doctorpage/Doctorpage";

export const AppRouter = () =>{
	const isAuthenticated = useSelector(authSelector.isAuthenticated);
	const userRole = useSelector(authSelector.getUserRole);
	return(
		<Routes>
			<Route path="/" element={<Home/>}/>
			{isAuthenticated && userRole === ADMIN && <Route path="/userslist" element={<UserList/>}/>}
			{isAuthenticated && userRole === PATIENT && <Route path="/appointment" element ={<AppointmentPage/>}/>}
			{isAuthenticated && userRole === ADMIN && <Route path="/createuser" element={<CreateUser/>}/>}
			{isAuthenticated && userRole === DOCTOR && <Route path="/doctorpage" element={<Doctorpage/>}/>}
			<Route path="/login" element={
			<React.Suspense fallback="Loading">
			<Login/>
			</React.Suspense>
			}/>
			<Route path="*" element={<NoMatch/>}/>
		</Routes>
	)

}