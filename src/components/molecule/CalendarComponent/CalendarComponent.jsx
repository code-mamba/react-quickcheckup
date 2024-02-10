import React, { useEffect, useState } from 'react';
import './calendarcomponent.css';

export const CalendarComponent = ({ max, min }) => {
  const startTime = max;
  const endTime = min;

  const startTimeObject = new Date(`2000-01-01T${startTime}`);
  const endTimeObject = new Date(`2000-01-01T${endTime}`);

  const hoursDifference = (endTimeObject - startTimeObject) / (1000 * 60 * 60);
  const rows = Array.from({ length: hoursDifference + 1 }, (_, index) => {
    const currentTime = new Date(startTimeObject.getTime() + index * 60 * 60 * 1000);
    return currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  });

  const [currentTimeIndicator, setCurrentTimeIndicator] = useState(0)


  useEffect(()=>{
    const updateCurrentTime = () =>{
        const now = new Date();
        const elapsedHours = (now-startTimeObject)/(1000 * 60 * 60)
        setCurrentTimeIndicator(elapsedHours)
    }
    const intervalId = setInterval(updateCurrentTime, 60000);
    return()=> clearInterval(intervalId)
  }, [startTimeObject])



  return (<>
    <div className="calendar-container">
      <div className="timeScale">
        {rows.map((formattedTime, index) => (
          <div key={index} className="row">
            {formattedTime}
          </div>
        ))}
      </div>
      <div className="events">
        <div className="rows-container">
          {rows.map((rowNumbers) => (
            <div key={rowNumbers} className="row"></div>
          ))}
        </div>
      </div>
    </div>
    <div className='timeIndicator' style={{top: `${(currentTimeIndicator / hoursDifference) * 100}%`}}></div>
    </>

  );
};
