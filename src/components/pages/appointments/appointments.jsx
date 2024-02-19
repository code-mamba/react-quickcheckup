import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, NoDataFound, Popup, Table } from 'src/components/atom/index'
import { AppointmentForm, CheckupDetails } from 'src/components/molecule/index'
import { appointmentSelector } from 'src/redux/slices/appointmentSlice'
import { fetchAppointmentsByPatientId } from 'src/redux/slices/appointmentSlice'
import { authSelector } from 'src/redux/slices/authSlice'
import { dispatch } from 'src/redux/store/store'

import { APPOINTMENTS } from './appointments-column'

import './appointment.css'

export const AppointmentPage = () => {
	const user = useSelector(authSelector.getUserData)
	const appointments = useSelector(appointmentSelector.getMyAppointments)
	const [selectedAppointmentId, setSelectedAppointmentId] = useState('')
	const [content, setContent] = useState(null)

	const contents = {
		checkupDetail: <CheckupDetails appointmentId={selectedAppointmentId} />,
		appointmentForm: <AppointmentForm onClose={() => setContent(null)} />
	}

	const handleCheckup = (appointmentId) => {
		setSelectedAppointmentId(appointmentId)
		setContent('checkupDetail')
	}
	const handleAppointment = () => {
		setContent('appointmentForm')
	}
	useEffect(() => {
		dispatch(fetchAppointmentsByPatientId(user.id))
	}, [dispatch, user.id])

	return (
		<>
			<div className="outer">
				<Button
					variant="primary"
					label="Book Appointment"
					onClick={handleAppointment}
				/>
				<div className="inner">
					{appointments && appointments.length > 0 ? (
						<>
							<div>
								<div className="appointmentheader">
									<h1>Your Appointments</h1>
								</div>

								<Table
									columns={APPOINTMENTS(handleCheckup)}
									data={appointments}
								/>
							</div>
						</>
					) : (
						<NoDataFound />
					)}
					<Popup content={contents[content]} onClose={() => setContent(null)} />
				</div>
			</div>
		</>
	)
}
