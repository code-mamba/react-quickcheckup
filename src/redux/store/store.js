import { configureStore } from '@reduxjs/toolkit'

import appointmentReducer from '../slices/appointmentSlice'
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: userReducer,
		appointments: appointmentReducer
	}
})

export const dispatch = store.dispatch
