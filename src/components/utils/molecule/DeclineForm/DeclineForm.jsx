import { Button } from "../../atoms/Button/Button"
import { useState } from "react"
import FormInput from "../../atoms/FormInput/FormInput"
import { dispatch } from "src/redux/store/store"
import { declineAppointment, fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice"

export const DeclineForm = (props) =>{
    const [values, setValues] = useState({
        status: 'Declined',
        declinedreason: ""
    })

    const onChange = (e) =>{
        setValues((value)=>({
            ...value,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(values)
        dispatch(declineAppointment({ appointmentId: props.appointmentId, declineData: values }))
        dispatch(fetchAppointmentsByDoctorId(props.doctorId))

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <FormInput label="Reason for Decline" name="declinedreason"  onChange ={onChange}type="textarea" rows="20"/>
            <Button label="Decline" type="default"/>
            </form>
        </div>
    )
}