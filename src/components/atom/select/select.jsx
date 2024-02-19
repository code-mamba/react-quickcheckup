import React from 'react'

import './select.css'

export const Select = (props) => {
	return (
		<>
			<label>{props.label}</label>
			<select onChange={props.onChange} {...props}>
				{props.options.map((option) => (
					<option key={option.value} value={option[props.valueKey]}>
						{option[props.optionValue]}
					</option>
				))}
			</select>
		</>
	)
}
