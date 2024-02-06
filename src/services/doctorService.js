import service from "./service";

export const doctorService = {
  declineAllAppointments: async (doctorId) => {
    try {
      const appointments = await service.get(
        `appointments?doctorid=${doctorId}`
      );
      const pendingAppointments = appointments.filter(
        (appointment) =>
          appointment.status === "pending" || appointment.status === "Approved"
      );

      await Promise.all(
        pendingAppointments.map(async (appointment) => {
          await service.patch("appointments", appointment.id, {
            status: "declined",
            declinedreason: "Doctor changed the available time",
          });
        })
      );

      console.log("All pending status are declined");
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  rescheduleAppointment: async({appointmentId, time}) =>{
    try{
        await service.patch("appointments", appointmentId, {
        status: "Rescheduled",
        scheduledTime: time
      })
      console.log("Rescheduled")
    }
    catch (error){
      throw error
    }
  }
};
