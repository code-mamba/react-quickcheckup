import { useEffect, useState } from 'react'
import service from 'src/services/api-service'

/*fetch the checked appointment details by passing the patientId and returns array*/

export const useMedicalHistory = (patientId) => {
	const [checkedAppointments, setCheckedAppointments] = useState([])
	useEffect(() => {

		const fetchData = async () => {
			const allAppointments = await service.get(
				`appointments?patientid=${patientId}`
			)

			const checkedAppointments = allAppointments.filter(
				(appointment) => appointment.status === 'Checked'
			)
		

			setCheckedAppointments(checkedAppointments)

		}
		fetchData()
	}, [patientId])

	return checkedAppointments
}
