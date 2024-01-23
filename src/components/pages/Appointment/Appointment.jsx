import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { appointmentSelector } from "src/redux/slices/appointmentSlice";
import { authSelector } from "src/redux/slices/authSlices";

import { dispatch } from "src/redux/store/store";
import { formatTime } from "src/utils/time";
import { fetchAppointmentsByPatientId } from "src/redux/slices/appointmentSlice";
import "./appointment.css";
import { Table } from "src/components/utils/atoms/Table/Table";
import { AppointmentForm } from "./AppointmentForm";
import { Popup } from "src/components/utils/atoms/Popup/Popup";
import { CheckupDetails } from "../CheckupDetails/CheckupDetails";

export const AppointmentPage = () => {
  const user = useSelector(authSelector.getUserData);
  const { appointments } = useSelector(appointmentSelector);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [checkupDetail, setCheckupDetails] = useState(false);

  const APPOINTMENTS = [
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
      Header: "Checkup Details",
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleCheckup(row.original.id)}>
            Check up details
          </button>
        </div>
      ),
    },
  ];

  const handleCheckup = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setCheckupDetails(true);
  };
  useEffect(() => {
    dispatch(fetchAppointmentsByPatientId(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      <div className="appointment-page">
        <div className="appointment-list">
          <h1>Your appointments</h1>
          <div className="appointment-table">
            {appointments && appointments.length > 0 ? (
              <Table COLUMNS={APPOINTMENTS} DATA={appointments} />
            ) : (
              <p>No appointments available</p>
            )}
          </div>
        </div>
        <div>
          <div className="content-heading">
            <h2>Book Appointment</h2>
          </div>
          <div className="appointment-form">
            <AppointmentForm />
          </div>
        </div>
        <Popup
          isOpen={checkupDetail}
          onClose={() => setCheckupDetails(false)}
          children={<CheckupDetails appointmentId={selectedAppointmentId}/>}
        />
      </div>
    </>
  );
};
