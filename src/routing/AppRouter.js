import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ADMIN, DOCTOR, PATIENT } from 'src/components/Constant/constant'
import { DetailedPage } from 'src/components/molecule/detailed-page/detailed-page'
import Calendar from 'src/components/molecule/scheduler/scheduler'
import { AppointmentPage } from 'src/components/pages/appointments/appointments'
import { CreateUser } from 'src/components/pages/create-user/create-user'
import { DoctorDashboard } from 'src/components/pages/doctor-dashboard/doctor-dashboard'
import { Home } from 'src/components/pages/home/home'
import { Login } from 'src/components/pages/login/login'
import { NoMatch } from 'src/components/pages/no-Match/no-match'
import { UserList } from 'src/components/pages/user-list/user-list'

import { PrivateRoute } from './PrivateRouter'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/userslist"
				element={
					<PrivateRoute requiredRoles={[ADMIN]}>
						<UserList />
					</PrivateRoute>
				}
			/>
			<Route
				path="/createuser"
				element={
					<PrivateRoute requiredRoles={[ADMIN]}>
						<CreateUser />
					</PrivateRoute>
				}
			/>
			<Route
				path="/appointment"
				element={
					<PrivateRoute requiredRoles={[PATIENT]}>
						<AppointmentPage />
					</PrivateRoute>
				}
			/>
			<Route
				path="/doctorDashboard"
				element={
					<PrivateRoute requiredRoles={[DOCTOR]}>
						<DoctorDashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path="/mySchedule"
				element={
					<PrivateRoute requiredRoles={[DOCTOR]}>
						<Calendar />
					</PrivateRoute>
				}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/detailedpage" element={<DetailedPage />} />
			<Route path="*" element={<NoMatch />} />
		</Routes>
	)
}
