import { useState } from "react";
import { useSelector } from "react-redux";
import { DOCTOR_DETAILS } from "src/components/Constant/constant";
import { authSelector } from "src/redux/slices/authSlices";
import { Button } from "../../atoms/Button/Button";
import { FormInput } from "../../atoms/FormInput/FormInput";
import  Toast  from "src/components/utils/atoms/Toast/Toast";
import service from "src/services/service";

export const DoctorForm = () => {
  const user = useSelector(authSelector.getUserData);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const [values, setValues] = useState({
    username: `${user.username}`,
    email: `${user.email}`,
    dob: `${user.dob}`,
    contact: `${user.contact}`,
    from: "",
    to: "",
    userrole: `${user.userrole}`,
  });

  const onChange = (e) => {
    setValues((value) => ({ ...value, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    service
      .put("users", user.id, values)
      .then((res) => {
        setToastMessage("Updated Success Message");
        setToastVariant("success");
      })
      .catch((err) => {
        setToastMessage("Unable to update");
        setToastVariant("decline");
      });
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
