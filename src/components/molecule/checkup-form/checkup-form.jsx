import React from 'react'
import { useState } from 'react'
import {
	Button,
	CheckupSummary,
	DynamicList,
	FormInput
} from 'src/components/atom/index'
import { useToast } from 'src/context/toast-context'
import { fetchAppointmentsByDoctorId } from 'src/redux/slices/appointmentSlice'
import { dispatch } from 'src/redux/store/store'
import DoctorService from 'src/services/doctor-service'

import { CHECKUP_INPUTS } from './constant'

import './checkup-form.css'

export const CheckupForm = ({appointmentId, doctorName, doctorId, onClose}) => {
	const [values, setValues] = useState({
		bodytemperature: '',
		systolicpressure: '',
		diastolicpressure: '',
		sugarlevel: '',
		doctoradvice: '',
		medicalprescription: []
	})
	const { showToast } = useToast()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await DoctorService.updateCheckup(
				appointmentId,
				doctorName,
				values
			)
			await dispatch(fetchAppointmentsByDoctorId(doctorId))
			showToast('Checkup updated Successfully', 'success')
			onClose()
		} catch (error) {
			showToast('Unable to Update Checkup', 'decline')
		}
	}
	const onChange = (e) => {
		setValues((value) => ({
			...value,
			[e.target.name]: e.target.value
		}))
	}
	const handleMedicalPrescription = (medicineListValues) => {
		setValues((prevValues) => ({
			...prevValues,
			medicalprescription: medicineListValues
		}))
	}
	return (
		<div>
			<CheckupSummary values={values} />
			<form onSubmit={handleSubmit}>
				<div className="grid-container">
					{CHECKUP_INPUTS.map((input, index) => (
						<div key={index} className="grid-item">
							<FormInput
								key={input.id}
								value={values[input.name]}
								{...input}
								onChange={onChange}
							/>
						</div>
					))}
				</div>
				<DynamicList
					label="Medical Prescription"
					values={values.medicalprescription}
					setValues={handleMedicalPrescription}
				/>
				<Button variant="default" label="Submit" />
			</form>
		</div>
	)
}
