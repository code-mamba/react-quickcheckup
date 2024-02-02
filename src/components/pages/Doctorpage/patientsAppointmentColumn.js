import { Button } from "src/components/utils/atoms/Button/Button";
import { formatTime } from "src/utils/time";
import { Tag } from "src/components/utils/atoms/Tag/Tag";
import { useNavigate } from "react-router-dom";
import { PATIENTAPPOINTMENTINFO } from "src/components/Constant/constant";
import Snackbar from "src/components/utils/atoms/Snackbar/Snackbar";

import { authSelector } from "src/redux/slices/authSlices";
import { useState } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "src/redux/store/store";
import { changeTime, fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice";

export const PATIENTS_APPOINTMENTS = (
  handleMedicalHistory,
  handleCheckupForm,
  handleAction
) => {
  const [showReschuduleInput, setShowRescheduleInput] = useState(false);
  const [newScheduledTime, setNewScheduledTime] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const user = useSelector(authSelector.getUserData);
  const doctorId = user?.id

  const handleRescheduleClick = () => {
    setShowRescheduleInput(true);
  };
  const handleRescheduleConfirm = (appointmentId) =>{
    console.log("Time",newScheduledTime)
    dispatch(changeTime({appointmentId,time:newScheduledTime}))
    dispatch(fetchAppointmentsByDoctorId(doctorId))
    setSnackbarMessage("Appointment rescheduled successfully");
    setShowSnackbar(true)
    setShowRescheduleInput(false)
  }
const handleRescheduleCancel = () =>{
  setShowRescheduleInput(false);
}
  return[
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
      Cell: ({ value,row }) =>(
        <div>
          {formatTime(value)}
          {row.original.status === "pending" &&(
            <>
            <button onClick={handleRescheduleClick}>
              Reschedule
            </button>
            {showReschuduleInput && (
              <>
              <input
                type="time"
                value={newScheduledTime}
                onChange={(e) => setNewScheduledTime(e.target.value)}
              />
              <button onClick={()=>handleRescheduleConfirm(row.original.id)}>Confirm</button>
              <button onClick={handleRescheduleCancel}>Cancel</button>
            </>
            )}
            </>
          )}
        </div>
      )
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
          {row.original.status === "Approved"||row.original.status ==="Rescheduled" ? (
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
                {showSnackbar && (
        <Snackbar
          message={snackbarMessage}
          onClose={() => setShowSnackbar(false)}
        />
      )}

        </div>
      ),
    },
  ];
   
}