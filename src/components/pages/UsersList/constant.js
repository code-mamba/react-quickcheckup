export const EDIT_PATIENT = [
  {
    id: 1,
    name: "username",
    type: "text",
    label: "Name",
    placeholder: "Enter Patient Name",
    errorMessage: "Please Enter Name",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter Patient Email",
    errorMessage: "Please Enter Email",
    label: "Email",
    required: true,
  },
  {
    id: 3,
    name: "dob",
    type: "date",
    label: "Date of Birth",
    errorMessage: "Enter Date of Birth",
    required: true,
  },
  {
    id: 4,
    name: "contact",
    type: "tel",
    label: "Contact Number",
    required: true,
    errorMessage: "Please Enter a contact Number",
  },
  {
    id: 5,
    name: "address",
    type: "textarea",
    label: "Enter Address",
    placeholder: "Enter Patient Address",
    errorMessage: "Please Enter a Address",
    required: true,
  },
];

export const EDIT_DOCTOR = [
  {
    id: 1,
    name: "username",
    type: "text",
    label: "Enter Doctor Name",
    placeholder: "Doctor Name",
    errorMessage: "Please Enter Doctor Name",
    required: true,
  },
  
  {
    id: 2,
    name: "email",
    type: "email",
    label: "Enter Doctor Email",
    placeholder: "Doctor Email",
    errorMessage: "Please Enter Doctor Email",
    required: true,
  },
  {
    id: 3,
    name: "contact",
    type: "text",
    label: "Enter Doctor's Contact Number",
    placeholder: "Doctor Contact",
    errorMessage: "Please Enter Doctor's Contact Number",
    required: true,
  },
  {
    id:4,
    name: 'dob',
    type: 'date',
    label: "Doctor's Date of Birth",
    errorMessage: "Please Enter Doctor's Date of Birth",
    required: true,
  }
];
