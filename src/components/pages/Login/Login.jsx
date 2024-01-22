import { useState } from "react";

import { Button } from "src/components/utils/atoms/Button/Button";
import { FormInput } from "src/components/utils/atoms/FormInput/FormInput";

import { useSelector } from "react-redux";
import { authSelector } from "src/redux/slices/authSlices";
import { login } from "src/services/authService";
import {
  LOGIN_INPUT,
} from "src/components/Constant/constant";
import "./login.css";

export const Login = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);
  let userData = useSelector(authSelector.getUserData);
  const [values, setValues] = useState({
    email: "",
    password: ""

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    login(values,isAuthenticated,userData)
    
  };

  const onChange = (e) => {
    setValues((value)=>({
      ...value,
      [e.target.name]:e.target.value
    }))
  };

  return (
    <div className="loginform">
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
        {LOGIN_INPUT.map((input)=>(
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
        ))}

        <Button type="default" label="Submit" />
      </form>
    </div>
  );
};
