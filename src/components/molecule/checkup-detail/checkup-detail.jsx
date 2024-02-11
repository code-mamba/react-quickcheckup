import React, { useEffect, useState } from "react";
import { Table } from "src/components/atom/index";
import service from "src/services/apiService";
import patientService from "src/services/patientService";
import { CHECKUPDETAILSCOLUMN } from "./checkup-detail-column";

import "./checkup-detail.css";

export const CheckupDetails = (props) => {
  const [appointment, setAppointment] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  useEffect(() => {
    const fetchCheckupDetails = async () => {
      try {
        const checkupDetails = await patientService.getCheckupDetails(
          props.appointmentId
        );
      
        setAppointment([checkupDetails]); // Wrap the object in an array
      } catch (error) {
      
        setToastMessage("Something went wrong");
        setToastVariant("decline");
      }
    };

    fetchCheckupDetails();
  }, [props.appointmentId]);

  return (
    appointment && Array.isArray(appointment) && appointment.length>0&&(
      <>
        <h1>Check up Detail</h1>
        <Table columns={CHECKUPDETAILSCOLUMN} data={appointment} />
      </>
    )
  );
};
