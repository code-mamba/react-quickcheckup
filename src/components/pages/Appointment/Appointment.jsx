import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Table,
  Popup,
  Button,
} from "src/components/atom/index";
import { NoDataFound } from "src/components/atom/no-data-found/no-data-found";
import {
  AppointmentForm,
  CheckupDetails,
} from "src/components/molecule/index";

import { appointmentSelector } from "src/redux/slices/appointmentSlice";
import { fetchAppointmentsByPatientId } from "src/redux/slices/appointmentSlice";
import { authSelector } from "src/redux/slices/authSlice";
import { dispatch } from "src/redux/store/store";

import "./appointment.css";

import { APPOINTMENTS } from "./appointmentsColumn";

export const AppointmentPage = () => {
  const user = useSelector(authSelector.getUserData);
  const appointments = useSelector(appointmentSelector.getMyAppointments);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [checkupDetail, setCheckupDetails] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const handleCheckup = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setCheckupDetails(true);
  };
  const handleAppointment = () => {
    setAppointmentOpen(true);
  };
  useEffect(() => {
    dispatch(fetchAppointmentsByPatientId(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      <div className="outer">
      <Button
            variant="primary"
            label="Book Appointment"
            onClick={handleAppointment}
          />
        <div className="inner">
       
          {appointments && appointments.length > 0 ?
           (
            <>
              <div>
                <div className="appointmentheader">
                  <h1>Your Appointments</h1>
                </div>

                <Table
                  columns={APPOINTMENTS(handleCheckup)}
                  data={appointments}
                />
              </div>
            </>
          ) : (
            <NoDataFound/>
          )}
          <Popup
            isOpen={appointmentOpen}
            onClose={() => setAppointmentOpen(false)}
            children={
              <AppointmentForm onClose={() => setAppointmentOpen(false)} />
            }
          />

          <Popup
            isOpen={checkupDetail}
            onClose={() => setCheckupDetails(false)}
            children={<CheckupDetails appointmentId={selectedAppointmentId} />}
          />
        </div>
      </div>
    </>
  );
};
