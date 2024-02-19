import { PASSWORD_REGEX } from 'src/utils/regexPatterns'

export const LOGIN_INPUT = [
	{
		id: 1,
		name: 'email',
		type: 'email',
		placeholder: 'Your email',
		label: 'Enter your email',
		errorMessage: 'Please enter a valid email',
		required: true
	},
	{
		id: 2,
		name: 'password',
		type: 'password',
		placeholder: 'Enter Password',
		label: 'Enter your password',
		errorMessage: 'Password was invalid',
		pattern: PASSWORD_REGEX,
		required: true
	}
]
