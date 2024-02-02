import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Popup } from "src/components/utils/atoms/Popup/Popup";
import { Table } from "src/components/utils/atoms/Table/Table";
import { Edit } from "./edit";

import {
  fetchUsers,
} from "src/redux/slices/userSlice";

import { dispatch } from "src/redux/store/store";
import { USERS_COLUMNS } from "./columns";
import "./userlist.css";
import { FormInput } from "src/components/utils/atoms";
import { USERS } from "src/components/Constant/constant";

export const UserList = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [isPopupOpen, setPopupOpen] = useState(false)
  const users = useSelector((state) => {
    return state.users.users;
  });

  const filterUsersByRole = (role) => {
    if (role === "All") {
      return users;
    } else {
      return users.filter((user) => user.userrole === role);
    }
  };
  const handleChangeRole = (e) => {
    setSelectedRole(e.target.value);
  };


  useEffect(() => {
    dispatch(fetchUsers());
  }, [selectedRole]);

  const closePopup = () => {
    setPopupOpen(false);
  };
  const filteredUsers = filterUsersByRole(selectedRole);
  return (
    <>
    <div className="userList">
    <FormInput valuekey="value" labelkey="value"  type="select" onChange={handleChangeRole} options={USERS}></FormInput>
      <div className="container">

      {filteredUsers && <Table columns ={USERS_COLUMNS} data={filteredUsers} />} 
        <Popup isOpen={isPopupOpen} onClose={closePopup} children={<Edit/>}/>
      </div>
      </div>
    </>
  );
};
