import { useState } from "react";
import { CHECKUP_INPUTS } from "src/components/Constant/constant";
import { Button } from "src/components/utils/atoms/Button/Button";
import FormInput from "src/components/utils/atoms/FormInput/FormInput";
import service from "src/services/service";
import "./checkupform.css";
import { fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice";
import { calculateBodyTemperature, calculateBp } from "src/utils/checkupfunctionalities";
import { dispatch } from "src/redux/store/store";
export const CheckupForm = (props) => {
  
const [values, setValues] = useState({
    bodytemperature: "",
    systolicpressure: "",
    diastolicpressure: "",
    sugarlevel: "",
    doctoradvice: "",
    medicalprescription: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };
  const onChange = (e) => {
    setValues((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1>Checkup</h1>
      <p>
        Systolic: {values.systolicpressure} Diastolic:{values.diastolicpressure}
      </p>
      <p>
        Blood Pressure:{" "}
        {calculateBp(values.systolicpressure, values.diastolicpressure)}
      </p>
      <p>
        Body Temp: {calculateBodyTemperature(values.bodytemperature)}
      </p>
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
        <Button type="default" label="Submit" />
      </form>
    </div>
  );
};
