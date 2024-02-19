import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar } from 'src/components/molecule/index'
import { setUser } from 'src/redux/slices/authSlice'
import { fetchUsers } from 'src/redux/slices/userSlice'
import { AppRouter } from 'src/routing/AppRouter'

import './App.css'

function App() {
	const dispatch = useDispatch()
	dispatch(fetchUsers())

	useEffect(() => {
		const storedUserData = localStorage.getItem('user')
		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData)
			dispatch(setUser(parsedUserData))
		}
	}, [dispatch])

	return (
		<>
			<Navbar />
			<AppRouter />
		</>
	)
}

export default App
