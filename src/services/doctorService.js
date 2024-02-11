import service from "./apiService";

class DoctorService {
  async declineAllAppointments(doctorId) {
    try {
      const appointments = await service.get(
        `appointments?doctorid=${doctorId}`
      );
      const pendingAppointments = appointments.filter(
        (appointment) =>
          appointment.status !== "Checked" || appointment.status !== "declined"
      );
      await Promise.all(
        pendingAppointments.map(async (appointment) => {
          await service.patch("appointments", appointment.id, {
            status: "declined",
            declinedreason: "Doctor Changed The Available Time",
          });
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async rescheduleAppointment({ appointmentId, time }) {
    try {
      await service.patch("appointments", appointmentId, {
        status: "Rescheduled",
        scheduledTime: time,
      });
    } catch (error) {
      throw error;
    }
  }
  async updateCheckup(appointmentId, doctorName, values) {
    try {
      await service.patch("appointments", appointmentId, {
        checkupstatus: values,
        status: "Checked",
        doctorname: doctorName,
      });
    } catch (error) {
      throw error;
    }
  }
}

// export const doctorService = {
//   declineAllAppointments: async (doctorId) => {
//     try {
//       const appointments = await service.get(
//         `appointments?doctorid=${doctorId}`
//       );
//       const pendingAppointments = appointments.filter(
//         (appointment) =>
//           appointment.status === "pending" ||
//           appointment.status === "Approved" ||
//           appointment.status === "Rescheduled"
//       );
//       await Promise.all(
//         pendingAppointments.map(async (appointment) => {
//           await service.patch("appointments", appointment.id, {
//             status: "declined",
//             declinedreason: "Doctor changed the available time",
//           });
//         })
//       );
//     } catch (error) {
//       throw error;
//     }
//   },
//   rescheduleAppointment: async ({ appointmentId, time }) => {
//     try {
//       await service.patch("appointments", appointmentId, {
//         status: "Rescheduled",
//         scheduledTime: time,
//       });
//     } catch (error) {
//       throw error;
//     }
//   },
// };

export default new DoctorService();
