import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADMIN, DOCTOR, PATIENT } from 'src/components/Constant/constant'
import { doAuth } from 'src/redux/slices/authSlice'

export const useLogin = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const login = async (values) => {
		const responseData = await dispatch(doAuth(values))
		const payload = responseData.payload

		if (payload) {
			localStorage.setItem('user', JSON.stringify(payload))
			localStorage.setItem('isAuthenticated', JSON.stringify(true))
			localStorage.setItem('userRole', JSON.stringify(payload.userrole))

			switch (payload.userrole) {
				case ADMIN:
					navigate('/userslist')
					break
				case PATIENT:
					navigate('/appointment')
					break
				case DOCTOR:
					navigate('/doctorDashboard')
					break
				default:
					return false
			}
			return true
		} else {
			return false
		}
	}
	return { login }
}
