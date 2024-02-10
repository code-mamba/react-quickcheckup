import { farenheitFormatter, mmHgFormatter, sugarLevelFormatter } from "src/utils/unitsFormatter";

export const CHECKUPDETAILSCOLUMN =[
    {
       Header: "Body Temperature",
       accessor: "bodytemperature",
       Cell:({value})=>farenheitFormatter(value) 
    },
    {
        Header: "Systolic Pressure",
        accessor: "systolicpressure",
        Cell:({value}) =>mmHgFormatter(value)
    },
    {
        Header: "Diastolic Pressure",
        accessor: "diastolicpressure",
        Cell:({value}) =>mmHgFormatter(value)
    },
    {
        Header: "Sugar Level",
        accessor: "sugarlevel",
        Cell:({value}) => sugarLevelFormatter(value)
    },
   
]