import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "src/services/service";

export const addAppointment = createAsyncThunk(
  "appintments.addAppointment",
  async (data) => {
    try {
      const appointment = await service.post("appointments", data);
      console.log(appointment);
      return appointment;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async (appointmentId) => {
    try {
      const appointment = service.get("appointments", appointmentId);
      return appointment;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchAppointmentsByDoctorId = createAsyncThunk(
  "appointments/fetchAppointmentsByDoctorId",
  async (doctorId) => {
    try {
      const appointments = await service.get(
        `appointments?doctorid=${doctorId}`
      );
      return appointments;
    } catch (e) {
      console.log(e);
    }
  }
);
export const fetchAppointmentsByPatientId = createAsyncThunk(
  "appointments/fetchAppointmentsByPatientId",
  async (patientId) => {
    try {
      const appointments = await service.get(
        `appointments?patientid=${patientId}`
      );
      return appointments;
    } catch (e) {
      console.log(e);
    }
  }
);

export const approveAppointment = createAsyncThunk(
  "appointments/approveAppointment",
  async (appointmentId) => {
    try {
      const updatedAppointment = await service.patch(
        "appointments",
        appointmentId,
        {
          status: "Approved",
          declinedreason:""
        }
      );
      return updatedAppointment;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const declineAppointment = createAsyncThunk(
  "appointments/declineAppointment",
  async ({appointmentId, declineData}) => {
 
    try {
      const updatedAppointment = await service.patch(
        "appointments",
        appointmentId,
        {
          status: "Declined",
          declinedreason: declineData.declinedreason
        }
        
      );
      return updatedAppointment;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);


const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    error: null,
  },
  selectors: {
    getMyAppointments: (state) => state.appointments,
  },
  extraReducers: (builder) => {
    builder.addCase(addAppointment.rejected, (state, { error }) => ({
      ...state,
      error: error.message,
    }));
    builder.addCase(addAppointment.fulfilled, (state, { payload }) => ({
      ...state,
      appointments: [...state.appointments, payload],
      error: null,
    }));
    builder.addCase(
      fetchAppointmentsByDoctorId.rejected,
      (state, { error }) => ({
        ...state,
        error: error.message,
      })
    );
    builder.addCase(
      fetchAppointmentsByDoctorId.fulfilled,
      (state, { payload }) => ({
        ...state,
        appointments: payload,
        error: null,
      })
    );
    builder.addCase(approveAppointment.rejected, (state, { error }) => ({
      ...state,
      error: error.message,
    }));

    builder.addCase(declineAppointment.fulfilled, (state, { payload }) => ({
      ...state,
      // Update the appointments array with the approved appointment
    
      error: null,
    }));
    builder.addCase(declineAppointment.rejected, (state, { error }) => ({
      ...state,
      error: error.message,
    }));
    builder.addCase(
      fetchAppointmentsByPatientId.fulfilled,
      (state, { payload }) => ({
        ...state,
        appointments: payload,
        error: null,
      })
    );
    builder.addCase(
      fetchAppointmentsByPatientId.rejected,
      (state, { error }) => ({
        ...state,
        error: error.message,
      })
    );
  },
});

export default appointmentSlice.reducer;
export const appointmentSelector = appointmentSlice.selectors;
