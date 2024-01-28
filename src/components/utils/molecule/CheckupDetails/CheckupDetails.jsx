import React, { useEffect, useState } from "react";
import service from "src/services/service";
import "./checkupdetails.css";

export const CheckupDetails = (props) => {
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await service.get("appointments", props.appointmentId);
        setAppointment(result);
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
  }, [props.appointmentId]);

  return (
    <div className="checkupdetails">
      <div className="checkupdetails-content">
        <h1>Checkup detail</h1>
        {error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          appointment && appointment.checkupstatus ? (
            <>
              <ul>
                {Object.entries(appointment.checkupstatus).map(([key, value]) => (
                    <div className="checkuplists" key={key}>
                        <div className="heading">{key}:</div>
                        <div className="value">{value}</div>
                    </div>
    
                ))}
              </ul>
            </>
          ):(
            <div className="no-data-found">No data found</div>
          )
        )}
      </div>
    </div>
  );
};
