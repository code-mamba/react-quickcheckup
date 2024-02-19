import { useEffect,useState } from 'react'
import appointmentService from 'src/services/appointment-service'

export const useAppointmentConflict = (
	doctorId,
	appointmentDate,
	scheduledTime
) => {
	const [isConflict, setIsConflict] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkConflict = async () => {
			try {
				const response = await appointmentService.checkAppointmentConflicts(
					doctorId,
					appointmentDate,
					scheduledTime
				)
				setIsConflict(response)
			} catch (err) {
				setIsConflict(true) // Assume conflict in case of an error
			} finally {
				setLoading(false)
			}
		}

		checkConflict()
	}, [doctorId, appointmentDate, scheduledTime])
	return { isConflict, loading }
}
