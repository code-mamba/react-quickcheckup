import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "src/components/utils/atoms/Card/Card";
import { Popup } from "src/components/utils/atoms/Popup/Popup";
import { Table } from "src/components/utils/atoms/Table/Table";
import { Edit } from "./edit";

import {
  fetchUsers,
  fetchUserById,
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


  const edit = (userId) => {
    console.log('Dispatched')
    dispatch(fetchUserById(userId));
    setPopupOpen(true) 
  };


const customActions = [
  {label: "Edit", onClick:edit},
  { label: "Approve", onClick: (rowId) => console.log(`Approve row with ID: ${rowId}`) }
]

  return (
    <>
      <div className="container">
        <Table COLUMNS ={USERS_COLUMNS} DATA={users} customActions={customActions} />
        <Popup isOpen={isPopupOpen} onClose={closePopup} children={<Edit/>}/>
      </div>
    </>
  );
};
