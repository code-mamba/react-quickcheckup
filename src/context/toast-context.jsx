import React, { createContext, useContext, useState } from 'react'
import { Toast } from 'src/components/atom/index'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState(null)

	const showToast = (message, variant) => {
		setToast({ message, variant })
	}
	const hideToast = () => {
		setToast(null)
	}

	return (
		<ToastContext.Provider value={{ showToast, hideToast }}>
			{children}
			{toast && (
				<Toast
					message={toast.message}
					variant={toast.variant}
					onClose={hideToast}
				/>
			)}
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}
