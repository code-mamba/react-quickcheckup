import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, FormInput, TimeRange } from 'src/components/atom/index'
import { useAppointmentConflict } from 'src/components/hook/useCheckConflict'
import { useDoctorInfoEffect } from 'src/components/hook/useDoctorInfoEffect'
import { useToast } from 'src/context/toast-context'
import { fetchAppointmentsByPatientId } from 'src/redux/slices/appointmentSlice'
import { authSelector } from 'src/redux/slices/authSlice'
import { userSelector } from 'src/redux/slices/userSlice'
import { dispatch } from 'src/redux/store/store'
import patientService from 'src/services/patient-service'
import { calculateAge } from 'src/utils/calculateAge'
import FileUpload from 'src/utils/fileUpload'

import { APPOINTMENT_FIELDS } from './constant'

import './appointment-form.css'

export const AppointmentForm = ({onClose}) => {
	const user = useSelector(authSelector.getUserData)
	const age = calculateAge(user.dob)
	const Doctors = useSelector(userSelector.getDoctors)
	const { showToast } = useToast()

	const [values, setValues] = useState({
		patientname: `${user.username}`,
		age: `${age}`,
		gender: `${user.gender}`,
		bloodgroup: `${user.bloodgroup}`,
		patientid: `${user.id}`,
		appointmentdate: '',
		reason: '',
		doctorid: '',
		doctorname: '',
		specialist: '',
		startTime: '',
		endTime: '',
		imgUrl: '',
		scheduledTime: '',
		vaccinated: '',
		status: 'pending'
	})

	const { isConflict } = useAppointmentConflict(
		values.doctorid,
		values.appointmentdate,
		values.scheduledTime
	)

	const onChange = (e) => {
		setValues((value) => ({ ...value, [e.target.name]: e.target.value }))
	}

	const handleFileChange = async (e) => {
		e.preventDefault()
		const selectedfile = e.target.files[0]
		FileUpload(selectedfile, setValues)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (isConflict) {
			showToast(
				'Sorry, the selected time is already booked. Please pick another time or date.',
				'decline'
			)
			return
		}
		try {
			const response = await patientService.requestAppointment(values)
			dispatch(fetchAppointmentsByPatientId(user.id))
			onClose()
			showToast(response, 'success')
		} catch (err) {
			showToast('Unable to request', 'decline')
		}
	}

	useDoctorInfoEffect(values, values.doctorid, Doctors, setValues)

	return (
		<>
			<div>
				{Doctors && (
					<form onSubmit={handleSubmit}>
						<h1>Book Appointment</h1>
						<div className="grid-container">
							{APPOINTMENT_FIELDS(
								user,
								age,
								Doctors,
								values.startTime,
								values.endTime
							).map((input) => (
								<div className="grid-item" key={input.id}>
									<FormInput {...input} onChange={onChange} />
								</div>
							))}
							{values.startTime && (
								<TimeRange
									startTime={values.startTime}
									endTime={values.endTime}
								/>
							)}
						</div>
						<FormInput
							label="Upload Report Scan"
							type="file"
							onChange={(e) => handleFileChange(e)}
						/>
						<Button label="Request Appointment" variant="default" />
					</form>
				)}
			</div>
		</>
	)
}
