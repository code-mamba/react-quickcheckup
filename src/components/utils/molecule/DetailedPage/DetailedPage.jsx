import React from "react";
import { useLocation } from "react-router-dom";
import { formatTime } from "src/utils/time";
import "./detailedpage.css";

export const DetailedPage = (props) => {
  const location = useLocation();
  const { appointmentData, columns } = location.state || {};

  const renderColumnValue = (key) => {
    const value = key
      ? key.split(".").reduce((acc, curr) => acc?.[curr], appointmentData)
      : undefined;
      return key === "scheduledTime" ? formatTime(value) : value !== undefined && value !== null ? value : "Nil";
  };
  console.log(appointmentData);
  return (
    <div>
      <h1>Detailed Page</h1>

      {appointmentData ? (
        <>
          <div className="detailedpage">
            {columns.map((column) => (
              <>
                <div className="detailedpage-content">
                  <div className="label">
                    <div className="detailedpage-label">{column.label}:</div>
                  </div>

                  <div className="detailedepage-values">
                    {renderColumnValue(column.key)}
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );
};
