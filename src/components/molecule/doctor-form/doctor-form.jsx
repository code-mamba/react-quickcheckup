import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, FormInput } from 'src/components/atom/index'
import { useToast } from 'src/context/toast-context'
import { fetchAppointmentsByDoctorId } from 'src/redux/slices/appointmentSlice'
import { authSelector } from 'src/redux/slices/authSlice'
import { dispatch } from 'src/redux/store/store'
import DoctorService from 'src/services/doctor-service'

import { DOCTOR_DETAILS } from './constant'

export const DoctorForm = () => {
	const user = useSelector(authSelector.getUserData)
	const { showToast } = useToast()
	const [values, setValues] = useState({
		from: `${user.from}`,
		to: `${user.to}`,	
	})

	const onChange = (e) => {
		setValues((value) => ({ ...value, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await DoctorService.changeAvailableTime(user.id, values)
			await dispatch(fetchAppointmentsByDoctorId(user.id))
			showToast(response, 'success')
		} catch (error) {
			showToast('Unable to Update', 'decline')
		}
	}

	return (
		<>
			<div className="doctorform">
				<h1>Update Timing</h1>
				<form onSubmit={handleSubmit}>
					<FormInput label="Doctor Name" value={user.username} disabled />
					{DOCTOR_DETAILS.map((input) => (
						<FormInput
							key={input.id}
							{...input}
							value={values[input.name]}
							onChange={onChange}
						/>
					))}
					<Button label="Update" variant="default" />
				</form>
			</div>
		</>
	)
}
