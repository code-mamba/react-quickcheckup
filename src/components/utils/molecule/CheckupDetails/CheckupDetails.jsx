import React, { useEffect, useState } from "react";
import {Table} from "src/components/utils/atoms/index"
import service from "src/services/service";
import { CHECKUPDETAILSCOLUMN } from "./checkupDetailsColumn";

import "./checkupdetails.css";

export const CheckupDetails = (props) => {
  const [appointment, setAppointment] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await service.get("appointments", props.appointmentId);
        if(result && result.checkupstatus){
          setAppointment([result.checkupstatus]);
        }
        else{
          setAppointment([])
        }
        
      } catch (e) {
        console.log(e)
        setError(e);
      }
    };

    fetchData();
  }, [props.appointmentId]);
  return (
    appointment &&(
      <>
      <h1>Check up Detail</h1>
        <Table columns={CHECKUPDETAILSCOLUMN} data={appointment}/>
      </>)
    )
}

