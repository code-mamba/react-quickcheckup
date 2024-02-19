import service from './api-service'

class PatientService {
	async getCheckupDetails(appointmentId) {

			const result = await service.get('appointments', appointmentId)

			if (Array.isArray(result) && result.length > 0) {
				const appointment = result[0]
				const checkupStatus = appointment.checkupstatus
				return checkupStatus
			}

	}

	async requestAppointment(appointmentData) {
		if (appointmentData.vaccinated === 'yes') {
			await service.post('appointments', appointmentData)
			return 'Requested Successfully'
		} else {
			return 'Without vaccinated you can\'t request appointment'
		}
	}
}

export default new PatientService()
