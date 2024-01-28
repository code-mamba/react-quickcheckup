import { Button } from "src/components/utils/atoms/Button/Button";
import { formatTime } from "src/utils/time";

export const PATIENTS_APPOINTMENTS = (handleMedicalHistory, handleCheckupForm, handleAction)=>[
    {
        Header: 'Appointment ID',
        accessor: 'id'
    },
    {
        Header: 'Patient Name',
        accessor: 'patientname',
        
    },
    {
        Header: 'Patient Age',
        accessor: 'age'
    },
    {
        Header: 'Reason',
        accessor: 'reason'
    },
    {
        Header: 'Appointment Date',
        accessor: 'appointmentdate'
    },
    {
        Header: 'Requested Time',
        accessor: 'scheduledTime',
        Cell:({value}) => formatTime(value)
    },
    {
        Header: 'Vaccinated',
        accessor: 'vaccinated'
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Patient's Medical History",
        Cell:({row:{original}}) =>(
            <Button label="Checkup Medical History" onClick={()=>handleMedicalHistory(original.patientid)} type="small"/>

        )
    },
    {
        Header: "Checkup details",
        Cell:({row}) =>(
            <div>
                <button onClick={()=>{
                    handleCheckupForm(row.original.id)}}>
                    Checkup
                </button>
            </div>
        )
    },
    {
        Header: "Actions",
        Cell:({row}) =>(
            <div className="botton-container">
                <Button onClick={() => handleAction(row.original.id, "approve")}type="small" label="Approve" />
           
            <Button onClick={() => handleAction(row.original.id, "decline")} type="small" label="Decline" />
            

          </div> 
        )
    }
]