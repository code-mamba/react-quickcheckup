export const calculateAge = (dob) => {
	const todayDate = new Date()
	const birthDate = new Date(dob)

	let ageInMillis = todayDate - birthDate
	const age = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000))
	return age
}
