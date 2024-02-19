import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/atom'
import { formatTime } from 'src/utils/time'

import { APPOINTMENTINFO } from './constant'

export const APPOINTMENTS = (handleCheckup) => [
	{
		Header: 'Doctor Name',
		accessor: 'doctorname'
	},
	{
		Header: 'Appointment Date',
		accessor: 'appointmentdate'
	},
	{
		Header: 'Requested Time',
		accessor: 'scheduledTime',
		Cell: ({ value }) => formatTime(value)
	},
	{
		Header: 'Status',
		accessor: 'status'
	},
	{
		Header: 'View Appointment Detail',
		Cell: ({ row }) => {
			const navigate = useNavigate()
			return (
				<div>
					<Button
						label="More Details"
						variant="secondaryOutlined"
						onClick={() =>
							navigate('/detailedpage', {
								state: {
									appointmentData: [row.original],
									columns: APPOINTMENTINFO,
									header: 'Appointment Detail'
								}
							})
						}
					/>
				</div>
			)
		}
	},
	{
		Header: 'Checkup Details',
		Cell: ({ row }) => (
			<>
				{row.original.status === 'Checked' && (
					<div>
						<Button
							label="View"
							variant="secondary"
							onClick={() => handleCheckup(row.original.id)} //passing appointment id to the function
						/>
					</div>
				)}
			</>
		)
	}
]
