import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { ToastProvider } from './context/toast-context'
import { store } from './redux/store/store'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ToastProvider>
					<App />
				</ToastProvider>
			</Router>
		</Provider>
	</React.StrictMode>
)

reportWebVitals()
