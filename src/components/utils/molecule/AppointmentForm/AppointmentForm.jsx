import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FormInput } from "src/components/utils/atoms/FormInput/FormInput";
import { Button } from "src/components/utils/atoms/Button/Button";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "src/utils/firebase"

import { addAppointment } from "src/redux/slices/appointmentSlice";
import { authSelector } from "src/redux/slices/authSlices";
import { userSelector } from "src/redux/slices/userSlice";

import { calculateAge } from "src/utils/calculateAge";
import { APPOINTMENT_FIELDS } from "src/components/Constant/constant";
import { dispatch } from "src/redux/store/store";

import { checkAppointmentConflicts } from "src/utils/appointmentUtils";
import "./appointmentform.css";
import { TimeRange } from "./TimeRange/TimeRange";
import Snackbar from "../../atoms/Snackbar/Snackbar";

export const AppointmentForm = (props) => {
  const user = useSelector(authSelector.getUserData);
  const age = calculateAge(user.dob);
  const Doctors = useSelector(userSelector.getDoctors);

  const [isConflict, setConflict] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [progresspercent, setProgresspercent] = useState(0);

  const [values, setValues] = useState({
    patientname: `${user.username}`,
    age: `${age}`,
    gender: `${user.gender}`,
    bloodgroup: `${user.bloodgroup}`,
    patientid: `${user.id}`,
    appointmentdate: "",
    reason: "",
    doctorid: "",
    doctorname:"",
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
    setConflict("")
  };
  const fileUpload = async(e) =>{
    console.log("changing")
    e.preventDefault();

      const file = e.target.files[0]
      if(!file) return;
      const storageRef = ref(storage, `file/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef,file);

      uploadTask.on('state_changed', (snapshot)=>{
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error)=>{
        alert(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setValues((value)=>({...value,imgUrl:downloadUrl}))
          console.log(values)
        })
      })
    

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hasConflict = await checkAppointmentConflicts(
        values.doctorid,
        values.appointmentdate,
        values.scheduledTime,
      );
      if (hasConflict) {
        setConflict("conflict found! Please choose diferent time or date");
      } else {
        dispatch(addAppointment(values));
        setSnackbarMessage("Appointment Requested")
        props.onClose()
      }
    } catch (error) {
      setSnackbarMessage("Unable to request Aappointment")
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
          doctorname: selectedDoctor.username,
          startTime: selectedDoctor.from,
          endTime: selectedDoctor.to,
          specialist:selectedDoctor.specialist
        });
      }
    }
  }, [values.doctorid]);

  return (
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
            fileUpload
          ).map((input) => (
            <div className="grid-item">
            <FormInput key={input.id} {...input} onChange={onChange} />
            </div>
          ))}
          {values.startTime && (
            <TimeRange startTime={values.startTime} endTime={values.endTime} />
          )}
          {isConflict && <p className="conflict">{isConflict}</p>}
          </div>
          <FormInput type="file" onChange={(e)=>fileUpload(e)}/>
          <Button label="Request Appointment" type="default" />
          
        </form>
        
      )}
      {snackbarMessage &&(<Snackbar message={snackbarMessage} onClose={()=>setSnackbarMessage("")}/>)}
    </div>
  );
};
