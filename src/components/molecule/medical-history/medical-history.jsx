import React from 'react'
import { useMedicalHistory } from 'src/components/hook/useMedicalHistory'

import './medical-history.css'

export const Medicalhistory = ({ patientId }) => {
	const checkedAppointments = useMedicalHistory(patientId)

	const navigateToDetailedPage = (index) =>{
		const url = '/detailedpage'
		const queryParams = new URLSearchParams({
			patientId: JSON.stringify(patientId),
			initialIndex: JSON.stringify(index)
		})
		const anchor = document.createElement('a')
		anchor.href = `${url}?${queryParams}`
		window.open(anchor.href, '_blank')
		anchor.remove()

	} 
	return (
		<div className="medicalHistory-container">
			<div>
				<h1>Patient Medical History</h1>
				<div className="medicalHistory-content">
					{checkedAppointments && checkedAppointments.length > 0 ? (
						checkedAppointments.map((appointment, index) => (
							<div
								className="list-of-links"
								key={index}
								onClick={() => {
									navigateToDetailedPage(index)
								}}
							>{`${appointment.appointmentdate}-${appointment.reason}`}</div>
						))
					) : (
						<h3>No medical history available for this patient.</h3>
					)}
				</div>
			</div>
		</div>
	)
}
