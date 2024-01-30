import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  Popup,
  CollapsedSidebar,
} from "src/components/utils/atoms/index";

import {
  DeclineForm,
  DoctorForm,
  CheckupForm,
  Medicalhistory,
} from "src/components/utils/molecule/index";

import { authSelector } from "src/redux/slices/authSlices";
import {
  appointmentSelector,
  fetchAppointmentsByDoctorId,
  approveAppointment,
} from "src/redux/slices/appointmentSlice";
import { dispatch } from "src/redux/store/store";
import { PATIENTS_APPOINTMENTS } from "./patientsAppointmentColumn";
import "./doctordashboard.css";

export const DoctorDashboard = () => {
  const user = useSelector(authSelector.getUserData);
  const doctorId = user?.id;
  const doctorName = user?.username;
  const appointments = useSelector(appointmentSelector.getMyAppointments);

  const [state, setState] = useState({
    isCheckupFormOpen: false,
    declineForm: false,
    selectedAppointmentId: "",
    isMedicalHistoryOpen: false,
    selectedPatientId: "",
  });

  const handleAction = (appointmentId, actionType) => {
    if (actionType == "approve") {
      dispatch(approveAppointment(appointmentId));
      dispatch(fetchAppointmentsByDoctorId(user.id));
    } else if (actionType == "decline") {
      setState({
        ...state,
        declineForm: true,
        selectedAppointmentId: appointmentId,
      });
    }
  };

  const handleCheckupForm = (appointmentId) =>
    setState({
      ...state,
      isCheckupFormOpen: true,
      selectedAppointmentId: appointmentId,
    });

  const handleMedicalHistory = (patientId) =>
    setState({
      ...state,
      isMedicalHistoryOpen: true,
      selectedPatientId: patientId,
    });
  useEffect(() => {
    dispatch(fetchAppointmentsByDoctorId(doctorId));
  }, []);

  console.log("doctor check",appointments)

  return (
    <div className="doctor-page">
      <div className="appointment-list">
        {appointments && (
          <Table
            columns={PATIENTS_APPOINTMENTS(
              handleMedicalHistory,
              handleCheckupForm,
              handleAction
            )}
            data={appointments}
          />
        )}
      </div>
      <CollapsedSidebar>
        <DoctorForm />
      </CollapsedSidebar>
      <Popup
        isOpen={state.isCheckupFormOpen}
        onClose={() => setState({ ...state, isCheckupFormOpen: false })}
      >
        <CheckupForm
          appointmentId={state.selectedAppointmentId}
          doctorName={doctorName}
          doctorId={doctorId}
          onClose={()=>setState({...state,isCheckupFormOpen:false})}
        />
      </Popup>
      <Popup
        appointmentId={state.selectedAppointmentId}
        isOpen={state.declineForm}
        onClose={() => setState({ ...state, declineForm: false })}
      >
        <DeclineForm
          appointmentId={state.selectedAppointmentId}
          doctorId={doctorId}
        />
      </Popup>
      <Popup
        isOpen={state.isMedicalHistoryOpen}
        onClose={() => setState({ ...state, isMedicalHistoryOpen: false })}
        children={<Medicalhistory patientId={state.selectedPatientId} />}
      />
    </div>
  );
};
