import React from 'react'
import { useState } from 'react'
import { Button, FormInput } from 'src/components/atom/index'
import { useLogin } from 'src/components/hook/useLogin'
import { useToast } from 'src/context/toast-context'

import { LOGIN_INPUT } from './constant'

import './login.css'

export const Login = () => {
	const { login } = useLogin()
	const { showToast } = useToast()
	const [values, setValues] = useState({
		email: '',
		password: ''
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await login(values)
		if (success) {
			showToast('Successfully Logged in', 'success')
			return
		}
		showToast('wrong credentials or user doesn\'t exist', 'decline')
	}

	const onChange = (e) => {
		setValues((value) => ({
			...value,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<>
			<div className="loginform">
				<form onSubmit={handleSubmit}>
					<h1>Login</h1>
					{LOGIN_INPUT.map((input) => (
						<FormInput
							key={input.id}
							{...input}
							value={values[input.name]}
							onChange={onChange}
						/>
					))}

					<Button variant={'default'} label="Submit" />
				</form>
			</div>
		</>
	)
}
