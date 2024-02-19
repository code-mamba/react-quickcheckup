import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CollapsedSidebar, Popup, Table } from 'src/components/atom/index'
import {
	CheckupForm,
	DeclineForm,
	DoctorForm,
	Medicalhistory
} from 'src/components/molecule/index'
import { useToast } from 'src/context/toast-context'
import {
	appointmentSelector,
	approveAppointment,
	fetchAppointmentsByDoctorId
} from 'src/redux/slices/appointmentSlice'
import { authSelector } from 'src/redux/slices/authSlice'
import { dispatch } from 'src/redux/store/store'

import { PATIENTS_APPOINTMENTS } from './patients-appointment-column'

import './doctor-dashboard.css'

export const DoctorDashboard = () => {
	const { id: doctorId, username: doctorName } = useSelector(
		authSelector.getUserData
	)
	const appointments = useSelector(appointmentSelector.getMyAppointments)

	const [content, setContent] = useState(null)
	const [selectedAppointmentId, setSelectedAppointmentId] = useState('')
	const [selectedPatientId, setSelectedPatientId] = useState('')
	const { showToast } = useToast()
	const contents = {
		checkupForm: (
			<CheckupForm
				doctorName={doctorName}
				doctorId={doctorId}
				appointmentId={selectedAppointmentId}
				onClose={() => setContent(null)}

			/>
		),
		declineForm: (
			<DeclineForm
				appointmentId={selectedAppointmentId}
				doctorId={doctorId}
				onClose={() => setContent(null)}
			/>
		),
		medicalHistory: <Medicalhistory patientId={selectedPatientId} />
	}
	const handleAction = async (appointmentId, actionType) => {
		if (actionType === 'approve') {
			Promise.all([
				await dispatch(approveAppointment(appointmentId)),
				await dispatch(fetchAppointmentsByDoctorId(doctorId))
			]).then(() => {
				showToast('Approved Successfully', 'success')
			})
		} else if (actionType === 'decline') {
			setSelectedAppointmentId(appointmentId)
			setContent('declineForm')
		}
	}

	const handleCheckupForm = (appointmentId) => {
		setSelectedAppointmentId(appointmentId)
		setContent('checkupForm')
	}
	const handleMedicalHistory = async (patientId) => {
		setSelectedPatientId(patientId)
		setContent('medicalHistory')
	}
	useEffect(() => {
		dispatch(fetchAppointmentsByDoctorId(doctorId))
	}, [])

	return (
		<div className="doctor-page">
			<div className="appointment-list">
				{appointments && (
					<Table
						columns={PATIENTS_APPOINTMENTS(
							handleMedicalHistory,
							handleCheckupForm,
							handleAction
						)}
						data={appointments}
					/>
				)}
			</div>
			<CollapsedSidebar>
				<DoctorForm />
			</CollapsedSidebar>
			<Popup content={contents[content]} onClose={() => setContent(null)} />
		</div>
	)
}
