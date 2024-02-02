import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { farenheitFormatter } from "src/utils/farenheitformatter";
import { ImageToPdfConverter } from "src/utils/imageToPdfConverter";
import { formatTime } from "src/utils/time";
import "./detailedpage.css";

export const DetailedPage = () => {
  const location = useLocation();
  const { appointmentData, columns, header } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [appointmentData]);

  const renderColumnValue = (key) => {
    const value = key
      ? key
          .split(".")
          .reduce((acc, curr) => acc?.[curr], appointmentData[currentIndex])
      : undefined;
  
    if (key === "imgUrl") {
      return (
      <>
      <img width={"300px"} src={value} alt="" />
      <ImageToPdfConverter/>
      </>);
    } else if (key === "checkupstatus.bodytemperature") {
      if(value){
        return farenheitFormatter(value)
      }
      else{
        return "Not available"
      }

    } else if (key === "scheduledTime") {
      return formatTime(value);
    }
  
    return value !== undefined && value !== null ? value : "Not available";
  };
  

  const handleNextAppointment = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % appointmentData.length);
  };

  const handlePreviousAppointment = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + appointmentData.length) % appointmentData.length
    );
  };

  return (
    <div>
        {appointmentData.length > 0 ? (
        <>
        <div className="main">
        <h1>{header}</h1>
          <div className="detailedpage">
            {columns.map((column) => (
              <div key={column.label} className="detailedpage-content">
                <div className="label">
                  <div className="detailedpage-label">{column.label}:</div>
                </div>

                <div className="detailedepage-values">
                  {renderColumnValue(column.key)}
                </div>
              </div>
            ))}
            <div className="button-container">
              {currentIndex != 0 && (
                <button
                  className="prev-button"
                  onClick={handlePreviousAppointment}
                >
                  &#8249;
                </button>
              )}

              {currentIndex < appointmentData.length - 1 && (
                <button className="next-button" onClick={handleNextAppointment}>
                  &#8250;
                </button>
              )}
            </div>
          </div>
          </div>
        </>
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );
};
