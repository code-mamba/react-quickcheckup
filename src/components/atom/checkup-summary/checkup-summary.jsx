import React from 'react'
import {
	calculateBodyTemperature,
	calculateBp
} from 'src/utils/checkupFunctionalities'
import {
	farenheitFormatter,
	mmHgFormatter,
	sugarLevelFormatter
} from 'src/utils/unitsFormatter'

export const CheckupSummary = ({ values }) => {
	return (
		<div>
			<h1>Checkup</h1>
			<h3>
				Systolic: {mmHgFormatter(values.systolicpressure)} Diastolic:
				{mmHgFormatter(values.diastolicpressure)}
			</h3>
			<h3>
				Blood Pressure:{' '}
				{calculateBp(values.systolicpressure, values.diastolicpressure)}
			</h3>
			<h3>
				Body Temp: {farenheitFormatter(values.bodytemperature)}{' '}
				{calculateBodyTemperature(values.bodytemperature)}
			</h3>
			<h3>Sugar level: {sugarLevelFormatter(values.sugarlevel)}</h3>
		</div>
	)
}
