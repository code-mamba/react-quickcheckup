import React from 'react'
import { Table } from 'src/components/atom/index'
import { useCheckupDetail } from 'src/components/hook/useCheckupDetail'

import { CHECKUPDETAILSCOLUMN } from './checkup-detail-column'

import './checkup-detail.css'

export const CheckupDetails = ({ appointmentId }) => {
	const appointment = useCheckupDetail(appointmentId)


	return (
		appointment && (
			<>
				<h1>Check up Detail</h1>
				<Table columns={CHECKUPDETAILSCOLUMN} data={appointment} />
			</>
		)
	)
}
