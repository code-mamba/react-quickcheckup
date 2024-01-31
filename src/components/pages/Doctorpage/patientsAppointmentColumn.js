import { Button } from "src/components/utils/atoms/Button/Button";
import { formatTime } from "src/utils/time";
import { Tag } from "src/components/utils/atoms/Tag/Tag";
import { useNavigate } from "react-router-dom";
import { PATIENTAPPOINTMENTINFO } from "src/components/Constant/constant";

export const PATIENTS_APPOINTMENTS = (
  handleMedicalHistory,
  handleCheckupForm,
  handleAction
) => [
  {
    Header: "Patient Name",
    accessor: "patientname",
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
    Header: "appointment detail",
    Cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div>
          <button
            onClick={() =>
              navigate("/detailedpage", {
                state: {
                  appointmentData: [row.original],
                  columns: PATIENTAPPOINTMENTINFO,
                  header: "Appointment Detail",
                },
              })
            }
          >
            More detail
          </button>
        </div>
      );
    },
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
          <Button
            onClick={() => handleCheckupForm(row.original.id)}
            label="Checkup"
          />
        ) : row.original.status === "Checked" ? (
          <div>
            <Tag label="Checked" color="green" />
          </div>
        ) : row.original.status === "Declined" ? (
          <Tag label="Declined" color="red" />
        ) : null}
      </div>
    ),
  },
];
