import service from './api-service'

class DoctorService {
	async declineAllAppointments(doctorId) {
		const appointments = await service.get(`appointments?doctorid=${doctorId}`)
		const pendingAppointments = appointments.filter(
			(appointment) =>
				appointment.status === 'Approved' ||
				appointment.status === 'pending' ||
				appointment.status === 'Rescheduled'
		)
		await Promise.all(
			pendingAppointments.map(async (appointment) => {
				await service.patch('appointments', appointment.id, {
					status: 'declined',
					declinedreason: 'Doctor Changed The Available Time'
				})
			})
		)
	}

	async rescheduleAppointment({ appointmentId, time }) {
		await service.patch('appointments', appointmentId, {
			status: 'Rescheduled',
			scheduledTime: time
		})
	}
	async updateCheckup(appointmentId, doctorName, values) {
		await service.patch('appointments', appointmentId, {
			checkupstatus: values,
			status: 'Checked',
			doctorname: doctorName
		})
	}
	async changeAvailableTime(doctorId, values) {
		await service.patch('users', doctorId, values)
		await this.declineAllAppointments(doctorId)
		return 'Time Updated Successfully'
	}
}

export default new DoctorService()
