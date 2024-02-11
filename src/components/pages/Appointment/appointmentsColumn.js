import { formatTime } from "src/utils/time";
import { useNavigate } from "react-router-dom";
import {APPOINTMENTINFO} from './constant'
import { Button } from "src/components/atom";
export const APPOINTMENTS = (handleCheckup) => [
  {
    Header: "Doctor Name",
    accessor: "doctorname",
  },
  {
    Header: "Appointment Date",
    accessor: "appointmentdate",
  },
  {
    Header: "Requested Time",
    accessor: "scheduledTime",
    Cell: ({ value }) => formatTime(value),
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "View Appointment Detail",
    Cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div>
          <Button
            label="More Details"
            variant="secondaryOutlined"
            onClick={() =>
              navigate("/detailedpage", {
                state: {
                  appointmentData: [row.original],
                  columns: APPOINTMENTINFO,
                },
              })
            }
          />
        </div>
      );
    },
  },
  {
    Header: "Checkup Details",
    Cell: ({ row }) => (
      <div>
        <Button
          label="Checkup Details"
          variant="secondary"
          onClick={() => handleCheckup(row.original.id)}
        />
      </div>
    ),
  },
];
