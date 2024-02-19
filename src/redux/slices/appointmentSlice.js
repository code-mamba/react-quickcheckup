import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import service from 'src/services/api-service'

export const addAppointment = createAsyncThunk(
	'appintments.addAppointment',
	async (data) => {
		const appointment = await service.post('appointments', data)
		return appointment
	}
)

export const fetchAppointmentById = createAsyncThunk(
	'appointments/fetchAppointmentById',
	async (appointmentId) => {
		const appointment = service.get('appointments', appointmentId)
		return appointment
	}
)

export const fetchAppointmentsByDoctorId = createAsyncThunk(
	'appointments/fetchAppointmentsByDoctorId',
	async (doctorId) => {
		const appointments = await service.get(`appointments?doctorid=${doctorId}`)
		return appointments
	}
)
export const fetchAppointmentsByPatientId = createAsyncThunk(
	'appointments/fetchAppointmentsByPatientId',
	async (patientId) => {
		const appointments = await service.get(
			`appointments?patientid=${patientId}`
		)
		return appointments
	}
)

export const approveAppointment = createAsyncThunk(
	'appointments/approveAppointment',
	async (appointmentId) => {
		const updatedAppointment = await service.patch(
			'appointments',
			appointmentId,
			{
				status: 'Approved',
				declinedreason: ''
			}
		)
		return updatedAppointment
	}
)
export const changeTime = createAsyncThunk(
	'appointments/changeTime',
	async ({ appointmentId, time }) => {
		await service.patch('appointments', appointmentId, {
			status: 'Rescheduled',
			scheduledTime: time
		})
	}
)
export const declineAppointment = createAsyncThunk(
	'appointments/declineAppointment',
	async ({ appointmentId, declineData }) => {
		const updatedAppointment = await service.patch(
			'appointments',
			appointmentId,
			{
				status: 'Declined',
				declinedreason: declineData.declinedreason
			}
		)
		return updatedAppointment
	}
)

const appointmentSlice = createSlice({
	name: 'appointments',
	initialState: {
		appointments: [],
		error: null
	},
	selectors: {
		getMyAppointments: (state) => state.appointments
	},
	extraReducers: (builder) => {
		builder.addCase(addAppointment.rejected, (state, { error }) => ({
			...state,
			error: error.message
		}))
		builder.addCase(addAppointment.fulfilled, (state, { payload }) => ({
			...state,
			appointments: [...state.appointments, payload],
			error: null
		}))
		builder.addCase(
			fetchAppointmentsByDoctorId.rejected,
			(state, { error }) => ({
				...state,
				error: error.message
			})
		)
		builder.addCase(
			fetchAppointmentsByDoctorId.fulfilled,
			(state, { payload }) => ({
				...state,
				appointments: payload,
				error: null
			})
		)
		builder.addCase(approveAppointment.rejected, (state, { error }) => ({
			...state,
			error: error.message
		}))

		builder.addCase(declineAppointment.fulfilled, (state) => ({
			...state,
			error: null
		}))
		builder.addCase(declineAppointment.rejected, (state, { error }) => ({
			...state,
			error: error.message
		}))
		builder.addCase(
			fetchAppointmentsByPatientId.fulfilled,
			(state, { payload }) => ({
				...state,
				appointments: payload,
				error: null
			})
		)
		builder.addCase(
			fetchAppointmentsByPatientId.rejected,
			(state, { error }) => ({
				...state,
				error: error.message
			})
		)
	}
})

export default appointmentSlice.reducer
export const appointmentSelector = appointmentSlice.selectors
