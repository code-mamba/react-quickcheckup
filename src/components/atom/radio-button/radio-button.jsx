import React from 'react'
import { Label } from 'src/components/atom/index'

import './radio-button.css'

const RadioButton = ({
	type,
	label,
	options,
	commonProps,
	required,
}) => {
	return (
		<>
			<Label label={label} required={required} />
			<div className="radio-button-content">
				{options.map((option) => (
					<label key={option.label}>
						<input
							className="radioInput"
							type={type}
							value={option.value}
							{...commonProps}
						/>
						{option.label}
					</label>
				))}
			</div>
		</>
	)
}

export default RadioButton
