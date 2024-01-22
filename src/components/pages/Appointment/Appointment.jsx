import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { MainBanner } from "../Banners/MainBanner";
import { FormInput } from "src/components/utils/atoms/FormInput/FormInput";
import { Select } from "src/components/utils/atoms/Select/Select";
import { Button } from "src/components/utils/atoms/Button/Button";

import {addAppointment} from "src/redux/slices/appointmentSlice"
import { authSelector } from "src/redux/slices/authSlices";
import { userSelector } from "src/redux/slices/userSlice";

import { calculateAge } from "src/utils/calculateAge";
import { APPOINTMENT_FIELDS } from "src/components/Constant/constant";
import { dispatch } from "src/redux/store/store";
import { formatTime } from "src/utils/time";
import "./appointment.css";


export const AppointmentPage = () => {
  const user = useSelector(authSelector.getUserData);
  const age = calculateAge(user.dob);
  const Doctors = useSelector(userSelector.getDoctors);

  const [values, setValues] = useState({
    patientname: `${user.username}`,
    age: `${age}`,
    appointmentdate: "",
    reason: "",
    doctorid: "",
    startTime: "",
    endTime:"",
    scheduledTime:"", 
    vaccinated:"",
    

  });

  const onChange = (e) => {
    setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    dispatch(addAppointment(values))
  
  };

  useEffect(()=>{
    if(values.doctorid){
      const selectedDoctor = Doctors.find((doctor)=>
        doctor.id === values.doctorid
      )
      if(selectedDoctor){
        setValues({
          ...values,
          startTime: selectedDoctor.from,
          endTime: selectedDoctor.to
        })
      }
    }
  },[values.doctorid])

  return (
    <>
      <MainBanner />
      <div className="appointment-content">
        <div className="content-heading">
          <h2>Book Appointment</h2>
        </div>
        <div className="appointment-form">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              name="patientname"
              value={user.username}
              disabled
            />
            <FormInput
              type="number"
              name="age"
              label="age"
              value={age}
              disabled
            />
            {APPOINTMENT_FIELDS.map((input) => (
              <FormInput key={input.id} {...input} onChange={onChange} />
            ))}
            <Select
              options={Doctors}
              valueKey="id"
              labelKey="username"
              onChange={onChange}
              name="doctorid"
            />
            {values.startTime && <div className="availableTime">
              <strong>Available Time </strong>
                <p>Start Time {formatTime(values.startTime)} - End Time {formatTime(values.endTime)}</p>
            </div>}
            <FormInput label="scheduleTime" type="time" name="scheduledTime" onChange={onChange}/>
            <FormInput type='radio' label="is Vaccinated" name="vaccinated" options={[{value:"yes", label:"Yes"},{value:"no", label:"No"}]} onChange={onChange} />
            <Button label="Appointment Now" type="default"  />
          </form>
        </div>
      </div>
    </>
  );
};


