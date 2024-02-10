import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Popup } from "src/components/atoms/index";
import { Table } from "src/components/atoms/Table/Table";
import { Edit } from "./edit";

import { fetchUsers } from "src/redux/slices/userSlice";

import { dispatch } from "src/redux/store/store";
import { USERS_COLUMNS } from "./columns";
import "./userlist.css";
import { FormInput } from "src/components/atoms";
import { USERS } from "src/components/Constant/constant";
import { Delete } from "src/components/molecule/Delete/Delete";
import { AdminService } from "src/services/adminService";
import Toast from "src/components/atoms/Toast/Toast";

export const UserList = () => {
  const [selectedRole, setSelectedRole] = useState("All");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isDeletOpen, setIsDeletOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const users = useSelector((state) => {
    return state.users.users;
  });

  const filterUsersByRole = (role) =>
    role === "All" ? users : users.filter((user) => user.userrole === role);

  const handleChangeRole = (e) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [selectedRole]);

  const filteredUsers = filterUsersByRole(selectedRole);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setPopupOpen(true);
  };
  const handleDelete = (row) => {
    if (row.userrole === "Admin") {
      setSelectedRow(null);
      setToastMessage("Cannot delete admin");
      setToastVariant("decline");
      setIsDeletOpen(false);
    } else {
      setSelectedRow(row.id);
      setIsDeletOpen(true);
    }
  };

  const confirmDelete = () => {
    AdminService.deleteUser(selectedRow)
      .then(() => {
        dispatch(fetchUsers()).then(() => {
          setToastMessage("Deleted successfully");
          setToastVariant("success");
          setIsDeletOpen(false);
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <div className="userList">
        <div className="select-users">
          <FormInput
            valuekey="value"
            optionValue="value"
            type="select"
            onChange={handleChangeRole}
            options={USERS}
          />
        </div>
        <div className="container">
          {filteredUsers && (
            <Table
              columns={USERS_COLUMNS(handleEdit, handleDelete)}
              data={filteredUsers}
            />
          )}
        </div>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          children={<Edit selectedRow={selectedRow} onClose={() => setPopupOpen(false)} />}
        />
        <Popup
          isOpen={isDeletOpen}
          onClose={() => setIsDeletOpen(false)}
          children={
            <Delete
              handleDelete={confirmDelete}
              onClose={() => setIsDeletOpen(false)}
            />
          }
        />
        {toastMessage && (
          <Toast
            message={toastMessage}
            variant={toastVariant}
            onClose={() => setToastMessage("")}
          />
        )}
      </div>
    </>
  );
};
