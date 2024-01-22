import { useDispatch, useSelector } from "react-redux";
import { Table } from "src/components/utils/atoms/Table/Table";
import { DoctorForm } from "src/components/utils/molecule/DoctorForm/DoctorForm";
import { authSelector } from "src/redux/slices/authSlices";
import { appointmentSelector } from "src/redux/slices/appointmentSlice";
import {
  approveAppointment,
  declineAppointment,
} from "src/redux/slices/appointmentSlice";
import "./doctorpage.css";
import { useEffect } from "react";
import { fetchAppointmentsById } from "src/redux/slices/appointmentSlice";
export const Doctorpage = () => {
  const user = useSelector(authSelector.getUserData);
  const doctorId = user.id;
  const dispatch = useDispatch();
  const { appointments } = useSelector(appointmentSelector);

  const PATIENTS_APPOINTMENTS = [
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
    },
    {
      Header: "Vaccinated",
      accessor: "vaccinated",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleApprove(row.original.id)}>
            Approve
          </button>
          <button onClick={() => handleDecline(row.original.id)}>
            Decline
          </button>
        </div>
      ),
    },
  ];

  const handleApprove = (appointmentId) => {
    dispatch(approveAppointment(appointmentId));
    dispatch(fetchAppointmentsById(doctorId));
  };

  const handleDecline = (appointmentId) => {
    dispatch(declineAppointment(appointmentId));
    dispatch(fetchAppointmentsById(doctorId));
  };

  useEffect(() => {
    dispatch(fetchAppointmentsById(doctorId));
  }, []);

  console.log("appointments", appointments);
  return (
    <div className="doctor-page">
      <div className="appointment-list">
        {appointments && appointments.length > 0 ? (
          <Table COLUMNS={PATIENTS_APPOINTMENTS} DATA={appointments} />
        ) : (
          <p>No appointments available</p>
        )}
      </div>
      <div className="doctor-detailsform">
        <div className="form-content">
          <DoctorForm />
        </div>
      </div>
    </div>
  );
};
