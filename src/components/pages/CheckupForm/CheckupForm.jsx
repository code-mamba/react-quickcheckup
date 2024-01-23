import { useState } from "react";
import { CHECKUP_INPUTS } from "src/components/Constant/constant";
import { Button } from "src/components/utils/atoms/Button/Button";
import FormInput from "src/components/utils/atoms/FormInput/FormInput";
import service from "src/services/service";
import './checkupform.css'
import { calculateBp } from "src/utils/bloodPressure";
export const CheckupForm = (props) =>{

    const [values, setValues] = useState({
        bodytemperature: "",
        systolicpressure: "",
        diastolicpressure: "",
        sugarlevel:"",
        doctoradvice:"",
        medicalprescription:""
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          console.log("Form values:", values);
      
          // Assuming you're using service to make API requests, adjust accordingly
          const updatedCheckup = await service.patch('appointments',props.appointmentId, {
            checkupstatus: values,
            status: 'Checked'
          });
      
          console.log("Updated checkup:", updatedCheckup);
        } catch (error) {
          console.error("Error:", error);
          // Handle the error as needed, for example, display an error message to the user
        }
      };
      
// const handleSubmit = (e) =>{
//     e.preventDefault();
//     console.log(values)
//     service.patch()
//     try{
//         const updatedCheckup = await service.patch("appointments",props.appointmentId,{
//             checkupstatus:{
//                 values
//             }
//         })
//         console.log(updatedCheckup)
//     }
//     catch(e){
//         console.error(e);
//         throw e
//     }
// }
    const onChange = (e) =>{
        setValues((value)=>({
            ...value,
            [e.target.name]: e.target.value
        }))
    }
  

    return(
        <div>
            <h1>Checkup</h1>
            <p>Systolic: {values.systolicpressure} Diastolic:{values.diastolicpressure}</p>
            <p>Blood Pressure: {calculateBp(values.systolicpressure, values.diastolicpressure)}</p>
            <form onSubmit={handleSubmit}>
                <div className="grid-container">
                {CHECKUP_INPUTS.map((input)=>(
                    <div className="grid-item">
                    <FormInput key={input.id} value={values[input.name]} {...input} onChange={onChange}/>
                    </div>
                ))}
                </div>

                
                 {/* <label>
        Body Temperature:
        <input
          type="number"
          step="0.1"
          min="0"
          value={bodyTemperature}
          onChange={(e) => setBodyTemperature(e.target.value)}
          required
        />
      </label>

      <label>
        Systolic Pressure:
        <input
          type="number"
          min="0"
          value={systolicPressure}
          onChange={(e) => setSystolicPressure(e.target.value)}
          required
        />
      </label>

      <label>
        Diastolic Pressure:
        <input
          type="number"
          min="0"
          value={diastolicPressure}
          onChange={(e) => setDiastolicPressure(e.target.value)}
          required
        />
      </label>

      <label>
        Sugar Level:
        <input
          type="number"
          step="0.1"
          min="0"
          value={sugarLevel}
          onChange={(e) => setSugarLevel(e.target.value)}
          required
        />
      </label> */}
      <Button type="default" label="Submit" />
            </form>
        </div>
    )
}