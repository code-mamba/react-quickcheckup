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

export const UserList = () => {

  const [isPopupOpen, setPopupOpen] = useState(false)
  const users = useSelector((state) => {
    return state.users.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const closePopup = () => {
    setPopupOpen(false);
  };

  console.log(users)
  return (
    <>
      <div className="container">
      {users && <Table columns ={USERS_COLUMNS} data={users} />} 
        <Popup isOpen={isPopupOpen} onClose={closePopup} children={<Edit/>}/>
      </div>
    </>
  );
};
