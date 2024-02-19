import { useEffect, useState } from 'react'

export const usePagination = (initialIndex, dataLength) => {

	const [currentIndex, setCurrentIndex] = useState(1)


	useEffect(() => {
		setCurrentIndex(initialIndex)
	}, [initialIndex])

	const handlePageChange = (index) => {
		setCurrentIndex(index)
	}
	const handlePreviousPage = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + dataLength) % dataLength)
	}
	const handleNextPage = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % dataLength)

	}

	return {
		currentIndex,
		handlePageChange,
		handlePreviousPage,
		handleNextPage
	}
}
