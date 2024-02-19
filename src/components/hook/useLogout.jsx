import { useNavigate } from 'react-router-dom'
import { useToast } from 'src/context/toast-context'
import { logout } from 'src/redux/slices/authSlice'
import { dispatch } from 'src/redux/store/store'

export const useLogout = () => {
	const navigate = useNavigate()
	const { showToast } = useToast()

	const handleLogout = async () => {
		navigate('/')
		dispatch(logout())
		localStorage.clear()
		showToast('successfully Logged out', 'success')
	}
	return {
		handleLogout
	}
}
