import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import service from 'src/services/api-service'

export const doAuth = createAsyncThunk('auth/doAuth', async (credentials) => {
	const fetchedusers = await service.get('users')
	if (Array.isArray(fetchedusers)) {
		const authenticatedUser = fetchedusers.find((user) => {
			return (
				user.password === credentials.password &&
				user.email === credentials.email
			)
		})

		if (authenticatedUser) {
			// eslint-disable-next-line no-unused-vars
			const { password, ...userWithoutPassword } = authenticatedUser
			return userWithoutPassword
		} else {
			return false
		}
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isAuthenticated: false,
		error: null
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
			state.isAuthenticated = true
		},
		logout: (state) => {
			return {
				...state,
				user: null,
				isAuthenticated: false,
				error: null
			}
		}
	},
	selectors: {
		getUserRole: (state) => (state.user ? state.user.userrole : null),
		isAuthenticated: (state) => state.isAuthenticated,
		getUserData: (state) => state.user
	},
	extraReducers: (builder) => {
		builder.addCase(doAuth.fulfilled, (state, { payload }) => {
			if (payload != null) {
				return {
					...state,
					error: null,
					isAuthenticated: true,
					user: payload
				}
			}
		})
		builder.addCase(doAuth.rejected, (state, { payload }) => ({
			...state,
			error: payload,
			isAuthenticated: false,
			user: null
		}))
	}
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
export const authSelector = authSlice.selectors
