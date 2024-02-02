import { farenheitFormatter } from "src/utils/farenheitformatter";

export const CHECKUPDETAILSCOLUMN =[
    {
       Header: "Body Temperature",
       accessor: "bodytemperature",
       Cell:({value})=>farenheitFormatter(value) 
    },
    {
        Header: "Systolic Pressure",
        accessor: "systolicpressure"
    },
    {
        Header: "Diastolic Pressure",
        accessor: "diastolicpressure"
    },
    {
        Header: "Sugar Level",
        accessor: "sugarlevel"
    },
   
]