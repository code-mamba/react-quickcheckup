import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMedicalHistory } from 'src/components/hook/useMedicalHistory'
import { usePagination } from 'src/components/hook/usePagination'
import { APPOINTMENTINFO } from 'src/components/pages/appointments/constant'

import renderColumnValue from './columnRenderer'

import './detailed-page.css'

export const DetailedPage = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const decodedPatientId = JSON.parse(queryParams.get('patientId'))
	const decodedInitialIndex = parseInt(queryParams.get('initialIndex'))
	const checkedAppointments = useMedicalHistory(decodedPatientId)

	const [values, setValues] = useState({
		appointmentData: [],
		columns: [],
		initialIndex: null,
		header: ''
	})

	useEffect(() => {
		if (checkedAppointments) {
			setValues((prevValues) => ({
				...prevValues,
				appointmentData: checkedAppointments,
				initialIndex: decodedInitialIndex
			}))
		}

		if (location.state) {
			const { appointmentData, columns, header, initialIndex } = location.state
			setValues((prevValues) => ({
				...prevValues,
				appointmentData,
				columns,
				initialIndex,
				header
			}))
		}
	}, [checkedAppointments])

	const { currentIndex, handlePageChange, handlePreviousPage, handleNextPage } =
		usePagination(values.initialIndex || 0, values.appointmentData.length)
	const renderPageNumbers = () => {
		return Array.from({ length: values.appointmentData.length }, (_, index) => (
			<button
				key={index}
				className={`page-number ${currentIndex === index ? 'activeNumber' : ''}`}
				onClick={() => handlePageChange(index)}
			>
				{index + 1}
			</button>
		))
	}

	return (
		<div>
			{values.appointmentData.length > 0 ? (
				<>
					<div className="main">
						<h1>{values.header}</h1>
						<div className="detailedpage">
							{APPOINTMENTINFO.map((column) => (
								<div key={column.label} className="detailedpage-content">
									<div className="label">
										<div className="detailedpage-label">{column.label}:</div>
									</div>
									<div className="detailedepage-values">
										{renderColumnValue(
											column.key,
											values.appointmentData,
											currentIndex
										)}
									</div>
								</div>
							))}
							<div className="button-container">
								{currentIndex != 0 && (
									<button className="prev-button" onClick={handlePreviousPage}>
										&#8249;
									</button>
								)}
								{currentIndex < values.appointmentData.length - 1 && (
									<button className="next-button" onClick={handleNextPage}>
										&#8250;
									</button>
								)}
							</div>
						</div>
						<div className="pagination">{renderPageNumbers()}</div>
					</div>
				</>
			) : (
				<p>Data not available</p>
			)}
		</div>
	)
}
