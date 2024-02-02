import { useState } from "react";

import { Button, FormInput, Select } from "src/components/utils/atoms/index";

import { addUser } from "src/redux/slices/userSlice";
import { dispatch } from "src/redux/store/store";
import {
  PATIENT,
  USERS,
  PATIENT_CREATION_FIELDS,
  DOCTOR,
  DOCTOR_CREATION_FIELDS,
  DOCTOR_DEFAULT_PWD,
  PATIENT_DEFAULT_PWD,
} from "src/components/Constant/constant";
import "./createuser.css";

export const CreateUser = () => {
  const [userType, setUserType] = useState(PATIENT);
  const [values, setValues] = useState({
    [PATIENT]: {
      username: "",
      email: "",
      password: PATIENT_DEFAULT_PWD,
      dob: "",
      contact: "",
      gender: "",
      userrole: PATIENT,
      address: "",
      bloodgroup: "",
    },
    [DOCTOR]: {
      username: "",
      email: "",
      password: DOCTOR_DEFAULT_PWD,
      contact: "",
      specialist: "",
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = userType === PATIENT ? values[PATIENT] : values[DOCTOR];
    dispatch(addUser(userData));
  };
  const onChange = (e) => {
    setValues((value) => ({
      ...value,
      [userType]: { ...value[userType], [e.target.name]: e.target.value },
    }));
  };
  const selectChange = (e) => {
    setUserType(e.target.value);
  };

  console.log(userType);

  return (
    <div className="createuser">
      <div className="createuser-form">
        <form onSubmit={handleSubmit}>
          <Select
            options={USERS}
            valuekey={"value"}
            labelKey={"value"}
            label="User Type"
            onChange={selectChange}
          />
          {userType === PATIENT &&
            PATIENT_CREATION_FIELDS.map((input) => (
              <FormInput
                key={input.id}
                value={values[input.name]}
                {...input}
                onChange={onChange}
              />
            ))}

          {userType === DOCTOR &&
            DOCTOR_CREATION_FIELDS.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
          <Button onChange={handleSubmit} type="small" label="Add User" />
        </form>
      </div>
    </div>
  );
};
