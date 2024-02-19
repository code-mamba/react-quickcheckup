import service from 'src/services/api-service'

class AppointmentService {
	async checkAppointmentConflicts(doctorId, appointmentDate, scheduledTime) {
		const doctorAppointments = await service.get(
			`appointments?doctorid=${doctorId}`
		)

		return doctorAppointments.some((appointment) => {
			return (
				appointment.appointmentdate === appointmentDate &&
				appointment.scheduledTime === scheduledTime
			)
		})
	}
}

export default new AppointmentService()
