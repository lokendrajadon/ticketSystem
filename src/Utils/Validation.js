export const Validation = (values) => {
  let errors = {
    email: "",
    password: "",
    phone: "",
    name: ""
  };

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (!/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(values.phone)) {
    errors.phone = "Phone is not valid";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is not valid";
  }

  if (values.password === "") {
    errors.password = "Password is required";
  } else if (values.password < 3) {
    errors.password = "Password ust be greater than 3 characters";
  }


  return errors;
};

export const ticketValidation = (values)=>{
    let errors = {
        ticketName:"",
        ticketNumber:'',
        ticketDate:'',
        ticketDescription:''
      };
    
     
      if (values.ticketName === "") {
        errors.ticketName = "Ticket Name is required";
      }
      if (values.ticketNumber === "") {
        errors.ticketNumber = "Ticket Number is required";
      } else if (!/^[0-9]+$/.test(values.ticketNumber)) {
        errors.ticketNumber = "Ticket Number must be a number";
      }
      if (values.ticketDate === "") {
        errors.ticketDate = "Ticket Date is required";
      }
      if (values.ticketDescription === "") {
        errors.ticketDescription = "Ticket Description is required";
      } else if (values.ticketDescription < 100) {
        errors.ticketDescription =
          "Ticket Description ust be greater than 100 characters";
      }
    
      return errors;
}