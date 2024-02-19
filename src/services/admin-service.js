import service from './api-service'

class AdminService {
	async addUser(userData) {
		const existingUser = await service.get(`users?email=${userData.email}`)
		if (existingUser.length > 0) {
			return 'User with Provided Email is Already Exists'
		}
		await service.post('users', userData)
		return 'User Created Successfully'
	}
	async deleteUser(userid) {
		await service.delete(`users/${userid}`)
		return 'User Deleted Successfully'
	}

	async editUser(userId, userData) {
		await service.patch('users', userId, userData)
		return 'Updated Successfuly'
	}
}

export default new AdminService()
