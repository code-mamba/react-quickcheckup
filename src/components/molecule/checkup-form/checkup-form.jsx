import { useState } from "react";
import { CHECKUP_INPUTS } from "./constant";
import { Button, FormInput } from "src/components/atom/index";
// import FormInput from "src/components/atom/FormInput/FormInput";
import "./checkup-form.css";
import { fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice";
import { Toast } from "src/components/atom/index";
import { dispatch } from "src/redux/store/store";
import DynamicList from "../../atom/dynamic-list/dynamic-list";
import DoctorService from "src/services/doctorService"
import CheckupSummary from "../../atom/checkup-summary/checkup-summary";

export const CheckupForm = (props) => {

const [toastMessage, setToastMessage] = useState("")
const [toastVariant, setToastVariant] = useState("")  
const [values, setValues] = useState({
    bodytemperature: "",
    systolicpressure: "",
    diastolicpressure: "",
    sugarlevel: "",
    doctoradvice: "",
    medicalprescription: [],
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      DoctorService.updateCheckup(props.appointmentId, props.doctorName,values)
      dispatch(fetchAppointmentsByDoctorId(props.doctorId))
      setToastMessage("Checkup updated Successfully")
      setToastVariant("success")
  
    }
    catch(error){
      setToastMessage("Unable to Update Checkup")
      setToastVariant("decline")
    }

 };
  const onChange = (e) => {
    setValues((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };
const handleMedicalPrescription = (medicineListValues) =>{
  setValues((prevValues)=>({
    ...prevValues,
    medicalprescription: medicineListValues
  }))
}
  return (
    <div>
     <CheckupSummary values={values}/>
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          {CHECKUP_INPUTS.map((input) => (
            <div className="grid-item">
              <FormInput
                key={input.id}
                value={values[input.name]}
                {...input}
                onChange={onChange}
              />
            </div>
          ))}
        </div>
        <DynamicList label="Medical Prescription" values={values.medicalprescription} setValues={handleMedicalPrescription}/>
        <Button variant="default" label="Submit" />
      </form>
      {toastMessage && <Toast message={toastMessage} onClose={()=>setToastMessage(null)} variant={toastVariant}/>}
    </div>
  );
};
