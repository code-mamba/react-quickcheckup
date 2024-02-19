import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { authSelector } from 'src/redux/slices/authSlice'

export const PrivateRoute = ({ requiredRoles, fallback = '/', children }) => {
	const isAuthenticated = useSelector(authSelector.isAuthenticated)
	const userRole = useSelector(authSelector.getUserRole)
	if (!isAuthenticated) {
		return <Navigate to={fallback} />
	}

	if (
		requiredRoles &&
		requiredRoles.length > 0 &&
		!requiredRoles.includes(userRole)
	) {
		return <Navigate to={fallback} />
	}

	return <React.Suspense fallback="Loading">{children}</React.Suspense>
}

PrivateRoute.propTypes = {
	requiredRoles: PropTypes.arrayOf(PropTypes.string),
	fallback: PropTypes.string,
	children: PropTypes.node.isRequired
}
