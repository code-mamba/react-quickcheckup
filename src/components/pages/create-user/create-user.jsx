import React from 'react'
import { useState } from 'react'
import { Button, FormInput, Select, Toast } from 'src/components/atom/index'
import { fetchUsers } from 'src/redux/slices/userSlice'
import { dispatch } from 'src/redux/store/store'
import adminService from 'src/services/admin-service'

import {
	DOCTOR,
	DOCTOR_CREATION_FIELDS,
	DOCTOR_DEFAULT_PWD,
	PATIENT,
	PATIENT_CREATION_FIELDS,
	PATIENT_DEFAULT_PWD,
	USERS} from './constant'

import './create-user.css'

export const CreateUser = () => {
	const [toastMessage, setToastMessage] = useState('')
	const [userType, setUserType] = useState(PATIENT)
	const [values, setValues] = useState({
		[PATIENT]: {
			username: '',
			email: '',
			password: PATIENT_DEFAULT_PWD,
			dob: '',
			contact: '',
			gender: '',
			userrole: PATIENT,
			address: '',
			bloodgroup: ''
		},
		[DOCTOR]: {
			username: '',
			email: '',
			password: DOCTOR_DEFAULT_PWD,
			contact: '',
			userrole: DOCTOR,
			specialist: ''
		}
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const userData = userType === PATIENT ? values[PATIENT] : values[DOCTOR]
		const result = await adminService.addUser(userData)
		setToastMessage(result)
		await dispatch(fetchUsers())
	}

	const onChange = (e) => {
		setValues((value) => ({
			...value,
			[userType]: { ...value[userType], [e.target.name]: e.target.value }
		}))
	}

	const selectChange = (e) => {
		setUserType(e.target.value)
	}

	return (
		<div className="createuser">
			<div className="createuser-form">
				<h1>Create User</h1>
				<form onSubmit={handleSubmit}>
					<div className="userform">
						<div>
							<Select
								options={USERS}
								valuekey={'value'}
								optionValue={'value'}
								labelKey={'value'}
								label="Users"
								onChange={selectChange}
							/>
						</div>
						{userType === PATIENT &&
							PATIENT_CREATION_FIELDS.map((input) => (
								<FormInput
									key={input.id}
									value={values[input.name]}
									{...input}
									onChange={onChange}
								/>
							))}

						{userType === DOCTOR &&
							DOCTOR_CREATION_FIELDS.map((input) => (
								<FormInput
									key={input.id}
									{...input}
									value={values[input.name]}
									onChange={onChange}
								/>
							))}
					</div>
					<Button
						onChange={handleSubmit}
						variant={'default'}
						label="Add User"
					/>
				</form>
			</div>
			{toastMessage && (
				<Toast message={toastMessage} onClose={() => setToastMessage('')} />
			)}
		</div>
	)
}
