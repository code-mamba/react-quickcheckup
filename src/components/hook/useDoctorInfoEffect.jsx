import { useEffect } from 'react'

export const useDoctorInfoEffect = (values, doctorId, doctors, setValues) => {
	useEffect(() => {
		const updateSelectedDoctorInfo = () => {
			const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId)
			if (selectedDoctor) {
				setValues({
					...values,
					doctorname: selectedDoctor.username,
					startTime: selectedDoctor.from,
					endTime: selectedDoctor.to,
					specialist: selectedDoctor.specialist
				})
			}
		}

		updateSelectedDoctorInfo()
	}, [doctorId])
}
