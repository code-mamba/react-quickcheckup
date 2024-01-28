import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FormInput } from "src/components/utils/atoms/FormInput/FormInput";
import { Button } from "src/components/utils/atoms/Button/Button";

import { addAppointment } from "src/redux/slices/appointmentSlice";
import { authSelector } from "src/redux/slices/authSlices";
import { userSelector } from "src/redux/slices/userSlice";

import { calculateAge } from "src/utils/calculateAge";
import { APPOINTMENT_FIELDS } from "src/components/Constant/constant";
import { dispatch } from "src/redux/store/store";
import { formatTime } from "src/utils/time";

import { checkAppointmentConflicts } from "src/utils/appointmentUtils";

export const AppointmentForm = () => {
  const user = useSelector(authSelector.getUserData);
  const age = calculateAge(user.dob);
  const Doctors = useSelector(userSelector.getDoctors);

  const [isConflict, setConflict] = useState('')

  const [values, setValues] = useState({
    patientname: `${user.username}`,
    age: `${age}`,
    patientid: `${user.id}`,
    appointmentdate: "",
    reason: "",
    doctorid: "",
    startTime: "",
    endTime: "",
    scheduledTime: "",
    vaccinated: "",
    status: "pending",
  });

  const onChange = (e) => {
    setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hasConflict = await checkAppointmentConflicts(
        values.doctorid,
        values.appointmentdate,
        values.scheduledTime
      );
      if (hasConflict) {
        setConflict("conflict found! Please choose diferent time or date");
      } else {
        dispatch(addAppointment(values));
      }
      
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (values.doctorid) {
      const selectedDoctor = Doctors.find(
        (doctor) => doctor.id === values.doctorid
      );
      if (selectedDoctor) {
        setValues({
          ...values,
          startTime: selectedDoctor.from,
          endTime: selectedDoctor.to,
        });
      }
    }
  }, [values.doctorid]);

  return (
    <div>
      {Doctors && (
        <form onSubmit={handleSubmit}>
          {APPOINTMENT_FIELDS(user,Doctors, values.startTime, values.endTime).map((input)=>(
            <FormInput key={input.id} {...input} onChange={onChange} />
          ))}
  
          {values.startTime && (
            <div className="availableTime">
              <strong>Available Time </strong>
              <p>
                Start Time {formatTime(values.startTime)} - End Time{" "}
                {formatTime(values.endTime)}
              </p>
            </div>
          )}
          {isConflict && <p>{isConflict}</p>}
          <Button label="Request Appointment" type="default" />
        </form>
      )}
    </div>
  );
};
