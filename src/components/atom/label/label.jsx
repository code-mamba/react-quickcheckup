import React from 'react'

import './label.css'
export const Label = ({ label, required }) => {
	return (
		<div className="label-container">
			<label>{label}</label>
			{required && <div className="required-element">*</div>}
		</div>
	)
}
