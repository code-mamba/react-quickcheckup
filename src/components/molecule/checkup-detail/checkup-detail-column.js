import {
	farenheitFormatter,
	mmHgFormatter,
	sugarLevelFormatter
} from 'src/utils/unitsFormatter'

export const CHECKUPDETAILSCOLUMN = [
	{
		Header: 'Body Temperature',
		accessor: 'bodytemperature',
		Cell: ({ value }) => (value ? farenheitFormatter(value) : 'Not checked')
	},
	{
		Header: 'Systolic Pressure',
		accessor: 'systolicpressure',
		Cell: ({ value }) => (value ? mmHgFormatter(value) : 'Not checked')
	},
	{
		Header: 'Diastolic Pressure',
		accessor: 'diastolicpressure',
		Cell: ({ value }) => (value ? mmHgFormatter(value) : 'Not checked')
	},
	{
		Header: 'Sugar Level',
		accessor: 'sugarlevel',
		Cell: ({ value }) => (value ? sugarLevelFormatter(value) : 'Not checked')
	}
]
