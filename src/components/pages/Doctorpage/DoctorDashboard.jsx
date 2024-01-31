import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PATIENTAPPOINTMENTINFO } from "src/components/Constant/constant";
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
import service from "src/services/service";
import { useNavigate } from "react-router-dom";

export const DoctorDashboard = () => {
  const user = useSelector(authSelector.getUserData);
  const doctorId = user?.id;
  const doctorName = user?.username;
  const appointments = useSelector(appointmentSelector.getMyAppointments);
  const navigate = useNavigate()

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

    const handleMedicalHistory = async (patientId) => {
      try {
        const allAppointments = await service.get(`appointments?patientid=${patientId}`)
        const checkedAppointment = await allAppointments.filter((appointment)=>appointment.status === "Checked")
        if(checkedAppointment.length>0){
          navigate('/detailedpage',{
            state:{
              appointmentData: checkedAppointment,
              columns: PATIENTAPPOINTMENTINFO,
              header: "Patient's Medical History"

            }
          })
        }
      }
      catch(error){
        console.error("Error fetching data:", error);
      }
    }
  useEffect(() => {
    dispatch(fetchAppointmentsByDoctorId(doctorId));
  }, []);

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
