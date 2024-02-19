import React from 'react'
import { useState } from 'react'
import { Button, FormInput } from 'src/components/atom/index'
import { useToast } from 'src/context/toast-context'
import { fetchUsers } from 'src/redux/slices/userSlice'
import { dispatch } from 'src/redux/store/store'
import adminService from 'src/services/admin-service'

import { EDIT_DOCTOR,EDIT_PATIENT } from './constant'

export const Edit = ({ selectedRow }) => {
	const { showToast } = useToast()
	const [values, setValue] = useState({
		username: `${selectedRow.username}`,
		email: `${selectedRow.email}`,
		dob: `${selectedRow.dob}`,
		contact: `${selectedRow.contact}`,
		address: `${selectedRow.address}`
	})

	const onChange = (e) => {
		setValue((value) => ({ ...value, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault(e)
		try {
			const response = await adminService.editUser(selectedRow.id, values)
			await dispatch(fetchUsers())
			showToast(response, 'success')
		} catch (err) {
			showToast('Unable to update', 'decline')
		}
	}

	return (
		<>
			<h1>Edit User</h1>
			<form onSubmit={handleSubmit}>
				{selectedRow.userrole === 'Patient'
					? EDIT_PATIENT.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={values[input.name]}
								onChange={onChange}
							/>
						))
					: EDIT_DOCTOR.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={values[input.name]}
								onChange={onChange}
							/>
						))}
				<Button variant={'default'} label={'Update'} />
			</form>
		</>
	)
}
