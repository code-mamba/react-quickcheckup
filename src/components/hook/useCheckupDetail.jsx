import { useEffect, useState } from 'react'
import { useToast } from 'src/context/toast-context'
import patientService from 'src/services/patient-service'

export const useCheckupDetail = ({ appointmentId }) => {
	const [checkupDetail, setCheckupDetail] = useState([])
	const { showToast } = useToast()

	useEffect(() => {
		const fetchCheckupDetails = async () => {
			try {
				const checkedupDetails =
					await patientService.getCheckupDetails(appointmentId)
				setCheckupDetail([checkedupDetails])
			} catch (error) {
				showToast('Something went wrong', 'decline')
			}
		}
		fetchCheckupDetails()
	}, [appointmentId])

	return checkupDetail
}
