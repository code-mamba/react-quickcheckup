import React from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import LoadingIndicator from 'src/components/atom/loading-indicator/loading-indicator'

let loadingIndicator = false
const showLoadingIndicator = () => {
	if (!loadingIndicator) {
		loadingIndicator = document.createElement('div')

		document.body.appendChild(loadingIndicator)
		createRoot(loadingIndicator).render(<LoadingIndicator />)
	}
}
const hideLoadingIndicator = () => {
	if (loadingIndicator) {
		createRoot(loadingIndicator).unmount()
		document.body.removeChild(loadingIndicator)
		loadingIndicator = null
	}
}

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 5000,
	headers: {
		'Content-type': 'application/json'
	}
})

instance.interceptors.request.use(
	(config) => {
		showLoadingIndicator()
		return config
	},
	(error) => {
		hideLoadingIndicator()
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	(response) => {
		hideLoadingIndicator()
		return response.data
	},
	(error) => {
		hideLoadingIndicator()
		switch (error.response?.status) {
			case 400:
				throw Promise.reject({ message: 'Bad Request' })
			case 404:
				throw Promise.reject({ message: 'Not Found' })
			case 409:
				throw Promise.reject({ message: 'Conflict' })
			case 401:
				throw Promise.reject({ message: 'Unauthorized' })
			case 500:
			case 502:
				throw Promise.reject('Something went wrong. Please Try again')
			default:
				throw Promise.reject(error.response?.data)
		}
	}
)

export default instance
