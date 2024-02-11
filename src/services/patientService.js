import service from "./apiService";

class PatientService {
  async getCheckupDetails(appointmentId) {
    try {
      const result = await service.get("appointments", appointmentId);

      return result && result.checkupstatus ? result.checkupstatus : [];
    } catch (error) {
      throw error;
    }
  }
}

export default new PatientService();
