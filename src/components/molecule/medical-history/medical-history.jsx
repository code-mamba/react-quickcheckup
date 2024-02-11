import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATIENTAPPOINTMENTINFO } from "src/components/pages/Doctorpage/constant";
import service from "src/services/apiService";
import "./medical-history.css";


export const Medicalhistory = ({patientId}) => {
  const [appointments, setAppointments] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAppointments = await service.get(
          `appointments?patientid=${patientId}`
        );
        const checkedAppointments = allAppointments.filter(
          (appointment) => appointment.status === "Checked"
        );
        setAppointments(checkedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [patientId]);

  const navigateToDetailedPage =(selectedAppointment, index) =>{
    navigate("/detailedpage",{
      state:{
        appointmentData: appointments,
        columns: PATIENTAPPOINTMENTINFO,
        initialIndex: index,
        selectedAppointment: selectedAppointment
      }
    })
  }

  return (
    <div className="medicalHistory-container">
      <div >
        <h1>Patient Medical History</h1>
        <div className="medicalHistory-content">
        {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div
                className="list-of-links"
                key={index}
                onClick={() => {
                  navigateToDetailedPage(appointment, index);
                }}
              >{`${appointment.appointmentdate}-${appointment.reason}`}</div>
            ))
          ) : (
            <h3>No medical history available for this patient.</h3>
          )}
          </div>
      </div>
    </div>
  );
};
