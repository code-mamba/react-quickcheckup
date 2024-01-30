import { formatTime } from "src/utils/time"
import { useNavigate } from "react-router-dom"
import { PATIENTAPPOINTMENTINFO } from "src/components/Constant/constant"
export const APPOINTMENTS = (handleCheckup) =>[

      {
        Header: "Doctor Name",
        accessor: "doctorname",
      },
      {
        Header: "Appointment Date",
        accessor: "appointmentdate",
      },
      {
        Header: "Requested Time",
        accessor: "scheduledTime",
        Cell: ({ value }) => formatTime(value),
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header:"View Appointment Detail",
        Cell:({row}) =>{
          const navigate = useNavigate()
          return(
            <div>
              <button onClick={()=>navigate('/detailedpage', {state:{appointmentData:row.original, columns:PATIENTAPPOINTMENTINFO}})}>More details</button>
            </div>
          )
        }
      },
      {
        Header: "Checkup Details",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleCheckup(row.original.id)}>
              Check up details
            </button>
          </div>
        ),
      },
]