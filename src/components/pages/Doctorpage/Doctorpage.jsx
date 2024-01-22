import { useDispatch, useSelector } from "react-redux"
import { Table } from "src/components/utils/atoms/Table/Table"
import { DoctorForm } from "src/components/utils/molecule/DoctorForm/DoctorForm"
import { authSelector } from "src/redux/slices/authSlices"
import { PATIENTS_APPOINTMENTS } from "./appointmentListcolumn"
import { appointmentSelector } from "src/redux/slices/appointmentSlice"

import "./doctorpage.css"
import { useEffect } from "react"
import { fetchAppointmentsById } from "src/redux/slices/appointmentSlice"
export const Doctorpage = () =>{
    const user = useSelector(authSelector.getUserData);
    const doctorId = user.id
    const dispatch = useDispatch()
    const { appointments } = useSelector(appointmentSelector);
    
    useEffect(()=>{
        dispatch(fetchAppointmentsById(doctorId));
    },[])
    

   return(
    <div className="doctor-page">
        <div className="appointment-list">
            {/* <div className="list-content"> */}
                <Table COLUMNS ={PATIENTS_APPOINTMENTS} DATA={appointments}/>
            {/* </div> */}
    
        </div>
        <div className="doctor-detailsform">
            <div className="form-content">
                <DoctorForm />
            </div>
        </div>
    </div>
   )
}