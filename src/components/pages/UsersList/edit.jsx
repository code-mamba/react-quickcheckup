import { useState } from "react";
import { Button, FormInput } from "src/components/atoms/index";
import Toast from "src/components/atoms/Toast/Toast";
import { fetchUsers } from "src/redux/slices/userSlice";
import { dispatch } from "src/redux/store/store";
import { AdminService } from "src/services/adminService";
import { EDIT_PATIENT, EDIT_DOCTOR } from "./constant";
export const Edit = ({selectedRow}) => {

    const [toastMessage, setToastMessage] = useState('')
    const [toastVariant, setToastVariant] = useState('')
    const [values, setValue] = useState({
        username: `${selectedRow.username}`,
        email: `${selectedRow.email}`,
        dob: `${selectedRow.dob}`,
        contact: `${selectedRow.contact}`,
        address: `${selectedRow.address}`
    
    })
const onChange = (e) =>{
    setValue((value)=>({...value, [e.target.name]:e.target.value}))
}
const handleSubmit = (e) =>{
    e.preventDefault(e)
    AdminService.editUser(selectedRow.id, values)
    .then(()=>{
        dispatch(fetchUsers())
        setToastMessage("Updated successfully")
        setToastVariant("success")
    })
}

  return (
    <>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        
        {selectedRow.userrole =='Patient'? EDIT_PATIENT.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        )):EDIT_DOCTOR.map((input)=>
          <FormInput  key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        )}
        <Button variant={'default'} label={"Update"}/>
      </form>
      {toastMessage&&<Toast message={toastMessage} onClose={()=>setToastMessage(null) } variant={toastVariant}/>}
    </>
  );
};
