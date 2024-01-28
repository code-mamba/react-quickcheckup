import { CONTACT_REGEX, PASSWORD_REGEX } from "src/utils/regexPatterns";
import { formatTime } from "src/utils/time";

export const LOGIN_INPUT = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Your email",
    label: "Enter your email",
    errorMessage: "Please enter a valid email",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    label: "Enter your password",
    errorMessage: "Password was invalid",
    pattern: PASSWORD_REGEX,
    required: true,
  },
];
export const GENDERS = [
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
];
export const PATIENT_CREATION_FIELDS = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter Patient Name",
    label: "Patient Name",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter Patient Email",
    errorMessage: "Enter a valid email",
    label: "Patient Email",
    required: true,
  },
  {
    id: 3,
    name: "dob",
    type: "date",
    label: "Date of Birth",
    errorMessage: "Please Fill the Patient Date of Birth",
    required: true,
  },
  {
    id: 4,
    name: "contact",
    type: "tel",
    label: "Contact Number",
    required: true,
    pattern: CONTACT_REGEX,
    errorMessage: "Please Enter a Valid Contact Number",
  },
  {
    id: 5,
    name: "address",
    type: "textarea",
    label: "Patient Address",
    placeholder: "Enter Patient Address",
    errorMessage: "Please Enter a Reason",
    required: true,
  },
  {
    id: 6,
    label: "Gender",
    name: "gender",
    type: "select",
    options: [
      { id: 1, value: "Male" },
      { id: 2, value: "Female" },
    ],
    valuekey: "value",
    labelkey: "value",
    required: true,
    errorMessage: "Please Select The Option",
  },
  {
    id: 7,
    label: "Blood Group",
    name: "bloodgroup",
    type: "select",
    options: [
      { id: 1, value: "O+" },
      { id: 2, value: "O-" },
      { id: 3, value: "A+" },
      { id: 4, value: "A-" },
      { id: 5, value: "B+" },
      { id: 6, value: "B-" },
      { id: 7, value: "AB+" },
      { id: 8, value: "AB-" },
    ],
    valuekey: "value",
    labelkey: "value",
    required: true,
    errorMessage: "Please Select Blood Group",
  },
];

export const DOCTOR_CREATION_FIELDS = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter Doctor Name",
    label: "Doctor Name",
    errorMessage: "Please Enter a Doctor Name",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter Doctor Email",
    errorMessage: "Enter a valid email",
    label: "Doctor Email",
    required: true,
  },
  {
    id: 3,
    name: "contact",
    type: "tel",
    placeholder: "Enter Contact Number",
    label: "Contact Number",
    errorMessage: "Please enter a valid contact number",
    required: true,
  },
  {
    id: 4,
    name: "specialist",
    type: "select",
    options: [
      { id: 1, value: "Dermatologist" },
      { id: 2, value: "Neurologist" },
      { id: 3, value: "Oncologist" },
      { id: 4, value: "Gynecologist" },
      { id: 5, value: "Psychiatrists" },
      { id: 6, value: "Cardiologist" },
      { id: 7, value: "Physicians" },
    ],
    valuekey: "value",
    labelkey: "value",
  },
];

export const PATIENT_DEFAULT_PWD = "Patient123";
export const DOCTOR_DEFAULT_PWD = "Doctor123";

export const BLOOD_GROUP = [
  { id: 1, value: "O+" },
  { id: 2, value: "O-" },
  { id: 3, value: "A+" },
  { id: 4, value: "A-" },
  { id: 5, value: "B+" },
  { id: 6, value: "B-" },
  { id: 7, value: "AB+" },
  { id: 8, value: "AB-" },
];

export const CREATE_USER_INPUT = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "New User Name",
    label: "Enter the New User name",
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter the new user email",
    label: "New User Email",
  },
  {
    id: 3,
    name: "dob",
    type: "date",
    placeholder: "Enter the new User Date of Birth",
    label: "New User Date of Birth",
  },
  {
    id: 4,
    name: "contact",
    type: "tel",
    placeholder: "Enter the new User Contact",
    label: "New User Contact",
  },
];

export const APPOINTMENT_FIELDS = (user, doctors, min, max) => [
  {
    id: 1,
    name: user.username,
    value:user.username,
    label: "Name",
    disabled: true,
  },
  {
    id: 2,
    name: "appointmentdate",
    type: "date",
    min: new Date().toISOString().split("T")[0],
    label: "Appointment Date",
    errorMessage: "Please select an appointment date",
    required: true,
  },
  {
    id: 3,
    name: "reason",
    type: "textarea",
    label: "Reason for appointment",
    errorMessage: "Please add a reason",
    required: true,
  },
  {
    id: 4,
    label:"select doctor",
    name: "doctorid",
    type: "select",
    options: doctors,
    labelkey: "username",
    valuekey: "id",
    required: true
  },
  {
    id: 5,
    label: "schedule Time",
    type: "time",
    name: "scheduledTime",
    min:min,
    max: max,
    errorMessage: `Please Select Time Between ${formatTime(min)} - ${formatTime(max)}`,
    required: true
  },
  {
    id: 6,
    label: "Did You take corona vaccination?",
    type: "radio",
    name: "vaccinated",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

export const USERS = [
  { id: 1, value: "Patient" },
  { id: 2, value: "Doctor" },
];
export const DOCTOR_DETAILS = [
  {
    id: 1,
    name: "from",
    type: "time",
    label: "From",
  },
  {
    id: 2,
    name: "to",
    type: "time",
    label: "To",
  },
];

export const EDIT_PATIENT = [
  {
    id: 1,
    name: "username",
    type: "text",
    label: "userName",
  },
  {
    id: 2,
    name: "dob",
    type: "time",
    label: "Date of birth",
  },
  {
    id: 3,
    name: "username",
    type: "text",
    label: "userName",
  },
];
export const CHECKUP_INPUTS = [
  {
    id: 1,
    name: "bodytemperature",
    type: "number",
    step: "0.1",
    label: "Body temperature",
    required: true,
  },
  {
    id: 2,
    name: "systolicpressure",
    image: "https://www.askapollo.com/assets/pro-health-new/weight.svg",
    type: "range",
    min: "0",
    max: "250",
    label: "Systolic Pressure",
    required: true,
  },
  {
    id: 3,
    name: "diastolicpressure",
    image: "https://www.askapollo.com/assets/pro-health-new/weight.svg",
    label: "Diastolic Pressure",
    type: "range",
    min: "0",
    max: "250",
    required: true,
  },
  {
    id: 4,
    type: "number",
    label: "Sugar Level",
    name: "sugarlevel",
    min: "0",
    required: true,
  },
  {
    id: 5,
    type: "textarea",
    label: "Doctor Advice",
    name: "doctoradvice",
    required: true,
    rows: "10",
  },
  {
    id: 6,
    type: "textarea",
    label: "Medical Prescription",
    name: "medicalprescription",
    rows: "10",
  },
];

export const PATIENT = "Patient";
export const DOCTOR = "Doctor";
export const ADMIN = "Admin";
export const ORGANISATION = "Organisation";
