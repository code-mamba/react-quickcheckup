import { useEffect, useState } from "react";
import { Table } from "src/components/utils/atoms/Table/Table";
import service from "src/services/service";
import { medicalHistoryColumn } from "./medicalHistoryColumn";

export const Medicalhistory = (props) => {
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAppointments = await service.get(
          `appointments?patientid=${props.patientId}`
        );
        const checkedAppointments = allAppointments.filter(
          (appointment) => appointment.status === "Checked"
        );
        setAppointments(checkedAppointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.patientId]);

  return (
    <div>
      <div>
        <h1>Patient Medical History</h1>
        {appointments && (
          <Table columns={medicalHistoryColumn} data={appointments} />
        )}
      </div>
    </div>
  );
};
