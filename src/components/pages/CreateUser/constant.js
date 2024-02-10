import { CONTACT_REGEX } from "src/utils/regexPatterns";

export const PATIENT = "Patient";
export const DOCTOR = "Doctor";
export const ADMIN = "Admin";
export const ORGANISATION = "Organisation";

export const USERS = [
 
    { id: 1, value: "Patient" },
    { id: 3, value: "Doctor" },
  ];


  export const PATIENT_CREATION_FIELDS = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Enter Patient Name",
      label: "Patient Name",
      errorMessage: "Enter Patient Name",
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
      optionValue: "value",
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
      optionValue: "value",
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
      label: "Select Speciality",
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
      optionValue: "value",
    },
  ];

  export const PATIENT_DEFAULT_PWD = process.env.REACT_APP_PATIENT_DEFAULT_PWD;
export const DOCTOR_DEFAULT_PWD = process.env.REACT_APP_DOCTOR_DEFAULT_PWD;