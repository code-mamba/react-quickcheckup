import { useState } from "react";

import { Button } from "src/components/utils/atoms/Button/Button";
import { FormInput } from "src/components/utils/atoms/FormInput/FormInput";

import { useSelector } from "react-redux";
import { authSelector } from "src/redux/slices/authSlices";
import {
  LOGIN_INPUT,
} from "src/components/Constant/constant";
import "./login.css";
import Toast from "src/components/utils/atoms/Toast/Toast";
import { login } from "src/services/authService";

export const Login = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);
  let userData = useSelector(authSelector.getUserData);
  const [toastMessage, setToastMessage] = useState()
  const [toastVariant, setToastVariant] = useState("")
  const [values, setValues] = useState({
    email: "",
    password: "",
   

  });

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      login(values, isAuthenticated, userData)
      if(isAuthenticated){
        setToastMessage('Successfully Logged in')
        setToastVariant("success")
      }
      else{
        setToastMessage("wrong credentials or user doesn't exist")
        setToastVariant("decline")
      }

    }
    catch (error) {
      setToastMessage("Login failed");
    }  
  };

  const onChange = (e) => {
    setValues((value)=>({
      ...value,
      [e.target.name]:e.target.value
    }))
  };

  return (<>
    <div className="loginform">
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
        {LOGIN_INPUT.map((input)=>(
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
        ))}

        <Button variant={"default"} label="Submit" />
      </form>
      
    </div>
    {toastMessage && (<Toast message={toastMessage} onClose={()=>setToastMessage(null)} variant={toastVariant}></Toast>)}
    </>
  );
};
