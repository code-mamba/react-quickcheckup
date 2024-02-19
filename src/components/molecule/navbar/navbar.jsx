import React from 'react'
import { NavLink } from 'react-router-dom'
import { ADMIN, DOCTOR, PATIENT } from 'src/components/Constant/constant'
import { useLogout } from 'src/components/hook/useLogout'

import './navbar.css'

export const Navbar = () => {
	const user = JSON.parse(localStorage.getItem('user'))
	const isAuthenticated = !!user // Check if user is authenticated
	const userRole = user ? user.userrole : null
	const { handleLogout } = useLogout()

	const navLinkStyles = ({ isActive }) => {
		return {
			color: 'white',
			fontWeight: isActive ? 'bold' : 'normal',
			fontSize: '25px'
		}
	}
	return (
		<>
			{isAuthenticated && (
				<nav className="navbar-container">
					{!isAuthenticated && (
						<NavLink style={navLinkStyles} to="/">
							Home
						</NavLink>
					)}

					{isAuthenticated && userRole === ADMIN && (
						<NavLink style={navLinkStyles} to="/userslist">
							Users List
						</NavLink>
					)}
					{isAuthenticated && userRole === ADMIN && (
						<NavLink style={navLinkStyles} to="/createuser">
							Create User
						</NavLink>
					)}
					{isAuthenticated && userRole === PATIENT && (
						<NavLink style={navLinkStyles} to="/appointment">
							Appointment
						</NavLink>
					)}
					{isAuthenticated && userRole === DOCTOR && (
						<NavLink style={navLinkStyles} to="/doctorDashboard">
							My Appointments
						</NavLink>
					)}
					{isAuthenticated && userRole === DOCTOR && (
						<NavLink style={navLinkStyles} to="/mySchedule">
							My Schedule
						</NavLink>
					)}
					{isAuthenticated && (
						<NavLink style={navLinkStyles} onClick={handleLogout} to="">
							Logout
						</NavLink>
					)}
					<div className="thinline" />
				</nav>
			)}
		</>
	)
}
