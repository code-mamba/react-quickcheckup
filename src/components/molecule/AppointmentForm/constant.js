import { formatTime } from "src/utils/time";
export const APPOINTMENT_FIELDS = (user,age, doctors, min, max, handleUpload) => [
    {
      id: 1,
      name: user.username,
      value:user.username,
      label: "Name",
      disabled: true, 
    },
    {
      id:2,
      name:age,
      value:age,
      label:"Age",
      disabled: true
    },
    {
      id: 3,
      name: "appointmentdate",
      type: "date",
      min: new Date().toISOString().split("T")[0],
      label: "Appointment Date",
      errorMessage: "Please select an appointment date",
      required: true,
    },
    {
      id: 4,
      name: "reason",
      type: "textarea",
      label: "Reason For Appointment",
      errorMessage: "Please add a reason",
      required: true,
    },
    {
      id: 5,
      label:"Select Doctor",
      name: "doctorid",
      type: "select",
      options: doctors,
      optionValue: "username",
      valuekey: "id",
      errorMessage: "Please select doctor",
      required: true
    },
    {
      id: 6,
      label: "Schedule Time",
      type: "time",
      name: "scheduledTime",
      min:min,
      max: max,
      errorMessage: `Please Select Time Between ${formatTime(min)} - ${formatTime(max)}`,
      required: true
    },
    {
      id: 7,
      label: "Did You Take Corona Vaccination?",
      type: "radio",
      name: "vaccinated",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      required: true
    },
  ];
  