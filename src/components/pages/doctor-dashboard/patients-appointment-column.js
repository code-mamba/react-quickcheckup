import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Tag } from 'src/components/atom/index'
import { useToast } from 'src/context/toast-context'
import { fetchAppointmentsByDoctorId } from 'src/redux/slices/appointmentSlice'
import { authSelector } from 'src/redux/slices/authSlice'
import { dispatch } from 'src/redux/store/store'
import DoctorSevice from 'src/services/doctor-service'
import { formatTime } from 'src/utils/time'

export const PATIENTS_APPOINTMENTS = (
	handleMedicalHistory,
	handleCheckupForm,
	handleAction
) => {
	const [showReschuduleInput, setShowRescheduleInput] = useState(false)
	const [newScheduledTime, setNewScheduledTime] = useState('')
	const { showToast } = useToast()
	const user = useSelector(authSelector.getUserData)
	const doctorId = user?.id

	const handleRescheduleClick = () => {
		setShowRescheduleInput(true)
	}
	const handleRescheduleConfirm = (appointmentId) => {
		DoctorSevice.rescheduleAppointment({
			appointmentId,
			time: newScheduledTime
		})
			.then(() => {
				dispatch(fetchAppointmentsByDoctorId(doctorId))
			})
			.then(() => {
				showToast('Appointment rescheduled successfully', 'success')
			})
		setShowRescheduleInput(false)
	}

	const handleRescheduleCancel = () => {
		setShowRescheduleInput(false)
	}

	return [
		{
			Header: 'Patient Name',
			accessor: 'patientname'
		},

		{
			Header: 'Appointment Date',
			accessor: 'appointmentdate'
		},
		{
			Header: 'Requested Time',
			accessor: 'scheduledTime',
			Cell: ({ value, row }) => (
				<div>
					<div>{formatTime(value)}</div>
					{row.original.status === 'pending' && (
						<>
							{!showReschuduleInput && (
								<Button
									variant="secondary"
									label="Reschedule"
									onClick={handleRescheduleClick}
								/>
							)}

							{showReschuduleInput && (
								<>
									<input
										type="time"
										value={newScheduledTime}
										onChange={(e) => setNewScheduledTime(e.target.value)}
									/>
									<div>
										<Button
											variant="success"
											label="Confirm"
											onClick={() => handleRescheduleConfirm(row.original.id)}
										/>
										<Button
											variant="danger"
											label="Cancel"
											onClick={handleRescheduleCancel}
										/>
									</div>
								</>
							)}
						</>
					)}
				</div>
			)
		},
		{
			Header: 'Appointment Details',
			Cell: ({ row }) => {
				const navigate = useNavigate()
				return (
					<div>
						<Button
							label="More Detail"
							variant="secondaryOutlined"
							onClick={() =>
								navigate('/detailedpage', {
									state: {
										appointmentData: [row.original]
									}
								})
							}
						/>
					</div>
				)
			}
		},
		{
			Header: 'Patient\'s Medical History',
			Cell: ({ row: { original } }) => (
				<Button
					label="Checkup Medical History"
					onClick={() => handleMedicalHistory(original.patientid)}
					variant="secondary"
				/>
			)
		},
		{
			Header: 'Actions',
			Cell: ({ row }) => (
				<div className="botton-container">
					{row.original.status === 'pending' && (
						<>
							<div
								style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
							>
								<div>
									<Button
										onClick={() => handleAction(row.original.id, 'decline')}
										variant="danger"
										label="Decline"
									/>
								</div>
								<div>
									<Button
										onClick={() => handleAction(row.original.id, 'approve')}
										variant="success"
										label="Approve"
									/>
								</div>
							</div>
						</>
					)}
					{row.original.status === 'Approved' ||
					row.original.status === 'Rescheduled' ? (
						<Button
							onClick={() => handleCheckupForm(row.original.id)}
							label="Checkup"
							variant="primary"
						/>
					) : row.original.status === 'Checked' ? (
						<div>
							<Tag label="Checked" variant="success" />
						</div>
					) : row.original.status === 'Declined' ? (
						<Tag label="Declined" variant="danger" />
					) : null}
				</div>
			)
		}
	]
}
