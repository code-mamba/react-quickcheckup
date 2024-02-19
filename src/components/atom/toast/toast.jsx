import React from 'react'
import { useEffect,useState } from 'react'

import StyledToast from './toast.sc'

export const Toast = ({ message, onClose, variant }) => {
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false)
			onClose()
		}, 3000)
		return () => clearTimeout(timer)
	})

	const handleClose = () => {
		setVisible(false)
		onClose()
	}
	return visible ? (
		<StyledToast variant={variant}>
			<p>{message}</p>
			<button onClick={handleClose}>Close</button>
		</StyledToast>
	) : null
}
