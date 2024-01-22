import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "src/services/service";

export const addAppointment = createAsyncThunk("appintments.addAppointment", async(data) =>{
    try{
        const appointment = await service.post("appointments", data);
        return appointment
    }
    catch (e) {
        console.log(e);
    }
})

export const fetchAppointmentsById = createAsyncThunk(
    "appointments/fetchAppointmentsById",
    async (doctorId)=>{
        try{
            console.log('from redux', doctorId)
            const appointments = await service.get(`appointments?doctorid=${doctorId}`)
            console.log('Appointments',appointments)
            return appointments
        }
        catch(e){
            console.log(e)

        }
    }
)

const appointmentSlice = createSlice({
    name: "appointments",
    initialState:{
        appointments:null,
        error: null
    },

    extraReducers:(builder) =>{
        builder.addCase(addAppointment.rejected,(state,{error})=>({
            ...state,
            error:error.message,
        }));
        builder.addCase(addAppointment.fulfilled,(state,{payload})=>({
            ...state,
            error: null,
        }))
        builder.addCase(fetchAppointmentsById.rejected, (state, { error }) => ({
            ...state,
            error: error.message,
          }));
          builder.addCase(fetchAppointmentsById.fulfilled, (state, { payload }) => ({
            ...state,
            appointments: payload,
            error: null,
          }));

    }
})

export default appointmentSlice.reducer;
export const appointmentSelector = (state)=>state.appointments;