import React from 'react'
import { useState } from 'react'
import { Button, FormInput } from 'src/components/atom/index'
import { useToast } from 'src/context/toast-context'
import {
	declineAppointment,
	fetchAppointmentsByDoctorId
} from 'src/redux/slices/appointmentSlice'
import { dispatch } from 'src/redux/store/store'

export const DeclineForm = ({ appointmentId, doctorId, onClose }) => {
	const { showToast } = useToast()
	const [values, setValues] = useState({
		status: 'Declined',
		declinedreason: ''
	})

	const onChange = (e) => {
		setValues((value) => ({
			...value,
			[e.target.name]: e.target.value
		}))
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		await dispatch(
			declineAppointment({ appointmentId: appointmentId, declineData: values })
		)
		await dispatch(fetchAppointmentsByDoctorId(doctorId))
		onClose()
		showToast('Declined Successfully', 'success')
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Reason for Decline"
					name="declinedreason"
					onChange={onChange}
					type="textarea"
					rows="20"
					errorMessage={'Please Add a Decline Reason'}
					required
				/>
				<Button label="Decline" variant="default" />
			</form>
		</div>
	)
}
