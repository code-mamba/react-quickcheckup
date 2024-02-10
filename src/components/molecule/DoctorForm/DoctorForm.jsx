
import { useState } from "react";
import { useSelector } from "react-redux";
import { DOCTOR_DETAILS } from "./constant";
import { authSelector } from "src/redux/slices/authSlice";
import { Button } from "../../atoms/Button/Button";
import { FormInput } from "../../atoms/FormInput/FormInput";
import  Toast  from "src/components/atoms/Toast/Toast";
import service from "src/services/apiService";
import  DoctorService  from "src/services/doctorService";
import { dispatch } from "src/redux/store/store";
import { fetchAppointmentsByDoctorId } from "src/redux/slices/appointmentSlice";


export const DoctorForm = () => {
  const user = useSelector(authSelector.getUserData);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const [values, setValues] = useState({
    username: `${user.username}`,
    email: `${user.email}`,
    dob: `${user.dob}`,
    contact: `${user.contact}`,
    password: `${user.password}`,
    from:`${user.from}`,
    to: `${user.to}`,
    userrole: `${user.userrole}`,
  });

  const onChange = (e) => {
    setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await service.put("users", user.id, values)
      setToastMessage("Time Updated Successfully")
      setToastVariant("success")
      await DoctorService.declineAllAppointments(user.id);
      dispatch(fetchAppointmentsByDoctorId(user.id))
    }
    catch(error){
      setToastMessage("Unable to Update")
      setToastVariant("decline")
    }
  };
  
  return (
    <>
      <div className="doctorform">
        <h1>Update Timing</h1>
        <form onSubmit={handleSubmit}>
          <FormInput label="Doctor Name" value={user.username} disabled />
          {DOCTOR_DETAILS.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Button label="Update" variant="default" />
        </form>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          variant={toastVariant}
        />
      )}
    </>
  );
};
