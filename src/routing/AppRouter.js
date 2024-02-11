import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom'
import { UserList } from "src/components/pages/UsersList/UserList";
import { Home } from "../components/pages/Home/Home";
import { Login } from "../components/pages/Login/Login";
import { NoMatch } from "../components/pages/NoMatch/NoMatch";
import { AppointmentPage } from "src/components/pages/Appointment/Appointment";
import { authSelector } from "src/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { CreateUser } from "src/components/pages/CreateUser/CreateUser";
import { ADMIN, DOCTOR, PATIENT } from "src/components/Constant/constant";
import { DoctorDashboard } from "src/components/pages/Doctorpage/DoctorDashboard";
import {DetailedPage} from "src/components/molecule/detailed-page/detailed-page"
import Calendar from "src/components/molecule/scheduler/scheduler";

export const AppRouter = () =>{
	const isAuthenticated = useSelector(authSelector.isAuthenticated);
	const userRole = useSelector(authSelector.getUserRole);
	const [isLoggedin, setIsLoggedIn] = useState(isAuthenticated)
	const navigate = useNavigate()
	

    
	useEffect(() => {
		if (isAuthenticated) {
		  switch (userRole) {
			case ADMIN:
			  navigate("/userslist");
			  break;
			case PATIENT:
			  navigate("/appointment");
			  break;
			case DOCTOR:
			  navigate("/doctorDashboard");
			  break;
			default:
			  console.log("Unknown user role");
		  }
		}
	  }, [isLoggedin, userRole, isAuthenticated]);
	return(
		<Routes>
			{!isAuthenticated &&<Route path="/" element={<Home/>}/>}
			{isAuthenticated && userRole === ADMIN && <Route path="/userslist" element={<React.Suspense fallback="Loading"><UserList/></React.Suspense>}/>}
			{isAuthenticated && userRole === PATIENT && <Route path="/appointment" element ={<React.Suspense fallback="Loading"><AppointmentPage/></React.Suspense>}/>}
			{isAuthenticated && userRole === ADMIN && <Route path="/createuser" element={<React.Suspense fallback="Loading"><CreateUser/></React.Suspense>}/>}
			{isAuthenticated&& userRole === DOCTOR && <Route path="/doctorDashboard" element={<React.Suspense fallback="Loading"><DoctorDashboard/></React.Suspense>}/>}
			{isAuthenticated&& userRole === DOCTOR && <Route path="/mySchedule" element={<React.Suspense><Calendar/></React.Suspense>}/>}
			{isAuthenticated && <Route path="/detailedpage" element={<React.Suspense fallback="Loading"><DetailedPage/></React.Suspense>}/>}
			<Route path="/login" element={
			<React.Suspense fallback="Loading">
			<Login/>
			</React.Suspense>
			}/>
			<Route path="*" element={<NoMatch/>}/>
		</Routes>
	)

}