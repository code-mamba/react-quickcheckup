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
import { useEffect, useState } from "react";
import { fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice";
import { formatTime } from "src/utils/time";
import { Popup } from "src/components/utils/atoms/Popup/Popup";
import { CheckupForm } from "../CheckupForm/CheckupForm";
export const Doctorpage = () => {
  const user = useSelector(authSelector.getUserData);
  const doctorId = user.id;
  const dispatch = useDispatch();
  const [isCheckupFormOpen, setCheckupFormOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('')
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
      Cell: ({value})=>formatTime(value)
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
      Header: 'Checkup details',
      Cell:({row}) =>(
        <div>
          <button onClick={()=> handleCheckupForm(row.original.id) }>checkup</button>
        </div>
      )
      
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
  const handleCheckupForm = (appointmentId) =>{
    setSelectedAppointmentId(appointmentId)
    setCheckupFormOpen(true)

  }
  const closeCheckupForm = () => {
    setCheckupFormOpen(false);
  };
  
  const handleApprove = (appointmentId) => {
    dispatch(approveAppointment(appointmentId));
    dispatch(fetchAppointmentsByDoctorId(doctorId));
  };

  const handleDecline = (appointmentId) => {
    dispatch(declineAppointment(appointmentId));
    dispatch(fetchAppointmentsByDoctorId(doctorId));
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
      {isCheckupFormOpen && <Popup isOpen={isCheckupFormOpen} onClose={closeCheckupForm} children={<CheckupForm appointmentId={selectedAppointmentId}/>} />}

    </div>
  );
};
