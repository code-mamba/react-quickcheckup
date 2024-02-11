import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar"
import moment from 'moment'
import { useSelector } from "react-redux"
import { appointmentSelector } from "src/redux/slices/appointmentSlice"

const localizer = momentLocalizer(moment)

const Calendar = () =>{
    const appointments = useSelector(appointmentSelector.getMyAppointments);
    const approvedAppointments = appointments.filter((appointment) => (
    appointment.status !== "pending"
    ));

    const events = approvedAppointments.map(appointment =>{
        const startDateTime = moment(`${appointment.appointmentdate}T${appointment.scheduledTime}`, 'YYYY-MM-DDTHH:mm')
        const endDateTime = startDateTime.clone().add(30, 'minutes'); 
        return{
            start: startDateTime.toDate(),
            end: endDateTime.toDate(),
            title: `${appointment.patientname} - ${appointment.reason}`
        }
    })  
    
    return(
       <BigCalendar defaultView="week"   views={['week', 'day']} events={events} localizer={localizer}/>
    )
}

export default Calendar