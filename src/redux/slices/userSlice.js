import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import service from 'src/services/api-service'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const fetchallusers = await service.get('users')
	const usersWithoutPassword = fetchallusers.map((user) => {
		// eslint-disable-next-line no-unused-vars
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	})
	return usersWithoutPassword
})

export const fetchUserById = createAsyncThunk(
	'users/fetchUserById',
	async (userId) => {
		const user = await service.get('users', userId)
		// eslint-disable-next-line no-unused-vars
		const { password, ...userWithoutPassword } = user

		return userWithoutPassword
	}
)
export const addUser = createAsyncThunk('users.addUser', async (data) => {
	const existingUser = await service.get(`users?email=${data.email}`)
	if (existingUser.length > 0) {
		throw new Error('User with provided email already exists')
	}
	const user = await service.post('users', data)
	return user
})

const userSlice = createSlice({
	name: 'users',
	initialState: {
		users: null,
		selectedUser: null,
		error: null
	},
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload
		},
		setSelectedUser: (state, action) => {
			state.selectedUser = action.payload
		}
	},
	selectors: {
		getUsers: (state) => state.users,
		getUser: (state) => state.selectedUser,
		getDoctors: (state) =>
			state.users
				? state.users.filter((user) => user.userrole === 'Doctor')
				: null
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, { payload }) => ({
			...state,
			error: null,
			users: payload
		}))
		builder.addCase(fetchUsers.rejected, (state, { payload }) => ({
			...state,
			error: payload,
			users: null
		}))
		builder.addCase(fetchUserById.fulfilled, (state, { payload }) => ({
			...state,
			error: null,
			selectedUser: payload
		}))
		builder.addCase(fetchUserById.rejected, (state, { payload }) => ({
			...state,
			error: payload,
			selectedUser: null
		}))
		builder.addCase(addUser.fulfilled, (state, { payload }) => ({
			...state,
			error: null,
			selectedUser: payload
		}))
		builder.addCase(addUser.rejected, (state, { error }) => ({
			...state,
			error: error.message,
			selectedUser: null
		}))
	}
})

export const { setUsers, setSelectedUser } = userSlice.actions
export default userSlice.reducer
export const userSelector = userSlice.selectors
