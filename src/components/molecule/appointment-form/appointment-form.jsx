import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "src/redux/store/store";

import {Button, FormInput,TimeRange, Toast} from "src/components/atom/index";
import FileUpload from "src/utils/fileUpload";

import { addAppointment } from "src/redux/slices/appointmentSlice";
import { authSelector } from "src/redux/slices/authSlice";
import { userSelector } from "src/redux/slices/userSlice";

import { calculateAge } from "src/utils/calculateAge";
import { APPOINTMENT_FIELDS } from "./constant";

import { checkAppointmentConflicts } from "src/services/appointmentService";
import "./appointment-form.css";

export const AppointmentForm = () => {
  const user = useSelector(authSelector.getUserData);
  const age = calculateAge(user.dob);
  const Doctors = useSelector(userSelector.getDoctors);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const [values, setValues] = useState({
    patientname: `${user.username}`,
    age: `${age}`,
    gender: `${user.gender}`,
    bloodgroup: `${user.bloodgroup}`,
    patientid: `${user.id}`,
    appointmentdate: "",
    reason: "",
    doctorid: "",
    doctorname: "",
    specialist: "",
    startTime: "",
    endTime: "",
    imgUrl: "",
    scheduledTime: "",
    vaccinated: "",
    status: "pending",
  });


  const onChange = (e) => {
    setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
  };


  const handleFileChange = async (e) => {
    e.preventDefault();
    const selectedfile = e.target.files[0]
    FileUpload(selectedfile, setValues)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {doctorid, appointmentdate, scheduledTime} = values
    checkAppointmentConflicts(doctorid, appointmentdate, scheduledTime ).then((res) => {
      if (res) {
        setToastMessage(
          "Sorry, the selected time is already booked. Please pick another time or date."
        );
        setToastVariant('decline')
      } else {
        dispatch(addAppointment(values)).then((res) => {
          setToastMessage("Appointment Requested");
          setToastVariant("success");
        });
      }
    });
  };

  const updateSelectedDoctorInfo = () =>{
    const selectedDoctor = Doctors.find((doctor)=>doctor.id === values.doctorid)
    selectedDoctor && setValues({
      ...values,
      doctorname: selectedDoctor.username,
      startTime: selectedDoctor.from,
      endTime: selectedDoctor.to,
      specialist: selectedDoctor.specialist
    })
  }
  useEffect(() => {
    if (values.doctorid) {
     updateSelectedDoctorInfo()
    }
  }, [values.doctorid]);

  return (
    <>
      <div>
        {Doctors && (
          <form onSubmit={handleSubmit}>
            <h1>Book Appointment</h1>
            <div className="grid-container">
              {APPOINTMENT_FIELDS(
                user,
                age,
                Doctors,
                values.startTime,
                values.endTime,
                handleFileChange
              ).map((input) => (
                <div className="grid-item">
                  <FormInput key={input.id} {...input} onChange={onChange} />
                </div>
              ))}
              {values.startTime && (
                <TimeRange
                  startTime={values.startTime}
                  endTime={values.endTime}
                />
              )}
            </div>
            <FormInput
              label="Upload Scan"
              type="file"
              onChange={(e) => handleFileChange(e)}
            />
            <Button label="Request Appointment" variant="default" />
          </form>
        )}
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          variant={toastVariant}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};