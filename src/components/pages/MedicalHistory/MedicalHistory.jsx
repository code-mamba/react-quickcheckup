import { useEffect, useState } from "react";
import { Table } from "src/components/utils/atoms/Table/Table";
import service from "src/services/service";

export const Medicalhistory = (props) => {
    const [appointments, setAppointments] = useState();
    const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await service.get(`appointments?patientid=${props.patientId}`);
        setAppointments(appointments)
        // Handle the appointments data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.patientId]);

  const medicalHistoryColumn = [
    {
        Header: "Patent Name",
        accessor: "patientname",
    },
    {
       Header: "Reason",
       accessor: "reason"
    },
    {
        Header: "Check-up Date",
        accessor: "appointmentdate"
    },
    {
        Header: "vaccinated",
        accessor: 'vaccinated'
    },
    {
        Header: "Body Temperature",
        accessor: 'checkupstatus.bodytemperature'
    },
    {
        Header:"Systolic Pressure",
        accessor: 'checkupstatus.systolicpressure'
    },
    {
        Header: "Diastolic Pressure",
        accessor: 'checkupstatus.diastolicpressure'
    },
    {
        Header: 'Sugarlevel',
        accessor: 'checkupstatus.sugarlevel'
    },
    {
        Header: "Medical prescription",
        accessor: 'checkupstatus.medicalprescription'
    }
  ]


  return (
    <div>
      <div>
        <h1>Patient Medical History</h1>
        {appointments &&<Table COLUMNS={medicalHistoryColumn} DATA={appointments}/>}
      </div>
    </div>
  );
}
