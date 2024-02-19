import {
	farenheitFormatter,
	mmHgFormatter,
	sugarLevelFormatter
} from 'src/utils/unitsFormatter'
export const CHECKUP_INPUTS = [
	{
		id: 1,
		name: 'bodytemperature',
		type: 'number',
		step: '0.1',
		label: `Body temperature (${farenheitFormatter('')} )`,
		errorMessage: 'Please Fill the Body Temperature',
		required: true
	},
	{
		id: 2,
		name: 'systolicpressure',
		image: 'https://www.askapollo.com/assets/pro-health-new/weight.svg',
		type: 'range',
		min: '0',
		max: '250',
		label: `Systolic Pressure (${mmHgFormatter('')} )`,
		errorMessage: 'Fill The Systolic Pressure',
		required: true
	},
	{
		id: 3,
		name: 'diastolicpressure',
		image: 'https://www.askapollo.com/assets/pro-health-new/weight.svg',
		label: `Diastolic Pressure (${mmHgFormatter('')} )`,
		type: 'range',
		min: '0',
		max: '250',
		errorMessage: 'Fill The Diastolic Pressure',
		required: true
	},
	{
		id: 4,
		type: 'number',
		label: `Sugar Level (${sugarLevelFormatter('')} )`,
		name: 'sugarlevel',
		min: '0'
	},
	{
		id: 5,
		type: 'textarea',
		label: 'Doctor Advice',
		name: 'doctoradvice',
		errorMessage: 'Please Fill Your Advice',
		required: true,
		rows: '10',
		cols: '800'
	}
]
