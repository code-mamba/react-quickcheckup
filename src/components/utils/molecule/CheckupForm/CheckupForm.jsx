import { useState } from "react";
import { CHECKUP_INPUTS } from "src/components/Constant/constant";
import { Button } from "src/components/utils/atoms/Button/Button";
import FormInput from "src/components/utils/atoms/FormInput/FormInput";
import service from "src/services/service";
import "./checkupform.css";
import { fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice";
import { calculateBodyTemperature, calculateBp } from "src/utils/checkupfunctionalities";
import { dispatch } from "src/redux/store/store";
import DynamicList from "../../atoms/DynamicList/DynamicList";
import { farenheitFormatter } from "src/utils/farenheitformatter";
import { mmHgFormatter } from "src/utils/mmHgFormatter";
import { sugarLevelFormatter } from "src/utils/sugarlevelFormatter";
export const CheckupForm = (props) => {
  
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

    console.log(values)

    try {
      const updatedCheckup = await service.patch(
        "appointments",
        props.appointmentId,
        {
          checkupstatus: values,
          status: "Checked",
          doctorname: props.doctorName,
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    dispatch(fetchAppointmentsByDoctorId(props.doctorId))
    props.onClose()
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
      <h1>Checkup</h1>
      <h3>
        Systolic: {mmHgFormatter(values.systolicpressure) } Diastolic:{mmHgFormatter(values.diastolicpressure)  }
      </h3>
      <h3>
        Blood Pressure:{" "}
        {calculateBp(values.systolicpressure, values.diastolicpressure)}
      </h3>
      <h3>
        Body Temp: {farenheitFormatter(values.bodytemperature)}  {calculateBodyTemperature(values.bodytemperature)}
      </h3>
      <h3>
        Sugar level:{sugarLevelFormatter(values.sugarlevel)}
      </h3>
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
    </div>
  );
};
