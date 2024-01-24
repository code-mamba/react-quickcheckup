import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "src/components/utils/atoms/Table/Table";
import { Popup } from "src/components/utils/atoms/Popup/Popup";
import { DoctorForm } from "src/components/utils/molecule/DoctorForm/DoctorForm";
import { CheckupForm } from "../CheckupForm/CheckupForm";
import { Medicalhistory } from "../MedicalHistory/MedicalHistory";
import { authSelector } from "src/redux/slices/authSlices";
import { appointmentSelector, fetchAppointmentsByDoctorId, approveAppointment, declineAppointment } from "src/redux/slices/appointmentSlice";
import { formatTime } from "src/utils/time";
import "./doctorpage.css";

export const Doctorpage = () => {
  const user = useSelector(authSelector.getUserData);
  const doctorId = user.id;
  const doctorName = user.username
  const dispatch = useDispatch();
  const [isCheckupFormOpen, setCheckupFormOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [isMedicalHistoryOpen, setIsMedicalHistoryOpen] = useState(false);
  const { appointments } = useSelector(appointmentSelector);
  const [selectedPatientId, setSelectedPatientId] = useState('')

  const PATIENTS_APPOINTMENTS = [
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
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Patient's Medical History",
      Cell: ({ row:{original} }) => (
        <button onClick={() => handleMedicalHistory(original.patientid)}>
          Check Medical history
        </button>
      ),
    },
    {
      Header: "Checkup details",
      Cell: ({ row:{original} }) => (
        <div>
          <button onClick={() => handleCheckupForm(original.id)}>
            checkup
          </button>
        </div>
      ),
    },
    {
      Header: "Actions",

      Cell: ({ row }) => (
        <div className="botton-container">
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
  const handleCheckupForm = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setCheckupFormOpen(true);
  };
  const closeCheckupForm = () => {
    setCheckupFormOpen(false);
  };

  const handleApprove = (appointmentId) => handleAction(appointmentId, 'approve');
  const handleDecline = (appointmentId) => handleAction(appointmentId, 'decline');

  const handleAction = (appointmentId, actionType) =>{
    const action = actionType === 'approve'? approveAppointment:declineAppointment
    dispatch(action(appointmentId));
    dispatch(fetchAppointmentsByDoctorId(doctorId))
  }

  const handleMedicalHistory = (patientId) => {
    setIsMedicalHistoryOpen(true);
    setSelectedPatientId(patientId);
  };

  useEffect(() => {
    dispatch(fetchAppointmentsByDoctorId(doctorId));
  }, []);

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
      {isCheckupFormOpen && (
        <Popup
          isOpen={isCheckupFormOpen}
          onClose={closeCheckupForm}
          children={<CheckupForm appointmentId={selectedAppointmentId} doctorName={doctorName} />}
        />
      )}
      <Popup
        isOpen={isMedicalHistoryOpen}
        onClose={() => setIsMedicalHistoryOpen(false)}
        children={<Medicalhistory patientId={selectedPatientId} />}
      />
    </div>
  );
};
