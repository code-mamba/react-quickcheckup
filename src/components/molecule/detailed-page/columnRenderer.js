import React from 'react';
import { farenheitFormatter, mmHgFormatter, sugarLevelFormatter } from 'src/utils/unitsFormatter';
import { ImageToPdfConverter } from 'src/utils/imageToPdfConverter';
import { formatTime } from 'src/utils/time';


const renderColumnValue = (key, appointmentData, currentIndex) => {
  const value = key?.split('.').reduce((acc, curr) => acc?.[curr], appointmentData[currentIndex]);
  switch (key) {
    case 'imgUrl':
      return value && <ImageToPdfConverter imgUrl={value} />;
    case 'checkupstatus.bodytemperature':
      return value && farenheitFormatter(value);
    case 'checkupstatus.systolicpressure':
    case 'checkupstatus.diastolicpressure':
      return value && mmHgFormatter(value);
    case 'checkupstatus.sugarlevel':
      return value && sugarLevelFormatter(value);
    case 'scheduledTime':
      return value && formatTime(value);
    default:
      return value !== undefined && value !== null ? value : 'Not available';
  }
};

export default renderColumnValue;
