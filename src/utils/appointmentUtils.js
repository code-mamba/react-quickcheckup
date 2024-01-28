import service from "src/services/service";
export const checkAppointmentConflicts = async (
  doctorId,
  appointmentDate,
  scheduledTime
) => {
    try {
        const doctorAppointments = await service.get(`appointments?doctorid=${doctorId}`)

        return doctorAppointments.some((appointment)=>{
            return(
                appointment.appointmentdate === appointmentDate&&
                appointment.scheduledTime === scheduledTime
            )
        })
    }
    catch(error){
        console.error(error)
        throw error
    }
};
