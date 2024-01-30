import { Button } from "src/components/utils/atoms/Button/Button";
import { formatTime } from "src/utils/time";
import { Tag } from "src/components/utils/atoms/Tag/Tag";

export const PATIENTS_APPOINTMENTS = (
  handleMedicalHistory,
  handleCheckupForm,
  handleAction
) => [
  {
    Header: "Appointment ID",
    accessor: "id",
  },
  {
    Header: "Patient Name",
    accessor: "patientname",
  },
  {
    Header: "Patient Age",
    accessor: "age",
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
    Header: "Vaccinated",
    accessor: "vaccinated",
  },
  {
    Header: "Patient's Medical History",
    Cell: ({ row: { original } }) => (
      <Button
        label="Checkup Medical History"
        onClick={() => handleMedicalHistory(original.patientid)}
        type="small"
      />
    ),
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <div className="botton-container">
        {console.log(row.original.status)}
        {row.original.status === "pending" && (
          <>
          <div>
            <Button
              onClick={() => handleAction(row.original.id, "approve")}
              type="small"
              label="Approve"
            />
            </div>
            <div>
            <Button
              onClick={() => handleAction(row.original.id, "decline")}
              type="small"
              label="Decline"
            />
            </div>
          </>
        )}
        {row.original.status === "Approved" ? (
            <Button onClick={()=>handleCheckupForm(row.original.id)} label="Checkup"/>
        ): row.original.status === "Checked" ?(<div>
            <Tag label="Checked" color="green"/>
        </div>):row.original.status === "Declined"?(
            <Tag label="Declined" color="red"/>
        ):null}
 
      </div>
    ),
  },
  
];
