import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import renderColumnValue from "./columnRenderer";
import "./detailed-page.css";

export const DetailedPage = () => {
  const location = useLocation();
  const { appointmentData, columns, header, initialIndex } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex||0);
  }, [appointmentData]);

  const handleNextAppointment = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % appointmentData.length);
  };

  const handlePageChange = (index) =>{
    setCurrentIndex(index)
  }

  const handlePreviousAppointment = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + appointmentData.length) % appointmentData.length
    );
  };
const renderPageNumbers = () =>{
  return Array.from ({length: appointmentData.length},(_, index) =>(
    
    <button key={index}
    className={`page-number ${currentIndex === index ? "activeNumber": ""}`}
    onClick={() => handlePageChange(index)}
    >
      {index+1}
    </button>
  ))
}
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
                  {renderColumnValue(column.key, appointmentData, currentIndex)}
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
          <div className="pagination">
          {renderPageNumbers()}
          </div>
          </div>
        </>
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );
};
