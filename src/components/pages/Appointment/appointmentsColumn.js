import { formatTime } from "src/utils/time"
export const APPOINTMENTS = (handleCheckup) =>[
    {
        Header: "Appointment Id",
        accessor: "id",
      },
      {
        Header: "Patient Name",
        accessor: "patientname",
      },
      {
        Header: "Reason",
        accessor: "reason",
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
        Header: "Reason for Declined",
        accessor: "declinedreason",
        Cell:({value}) => value? value: "----"
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