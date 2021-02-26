const form = document.getElementById('form');

// Select input fields
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');


// Select validation alerts
const firstnameEmptyAlert = document.getElementById('firstname-empty-alert');
const lastnameEmptyAlert = document.getElementById('lastname-empty-alert');
const emailEmptyAlert = document.getElementById('email-empty-alert');
const passwordEmptyAlert = document.getElementById('password-empty-alert');
const confirmPasswordEmptyAlert = document.getElementById('confirmPassword-empty-alert');

// Select Invalid alerts
const firstnameInvalidAlert = document.getElementById('firstname-invalid-alert');
const lastnameInvalidAlert = document.getElementById('lastname-invalid-alert');
const emailInvalidAlert = document.getElementById('email-invalid-alert');
const passwordInvalidAlert = document.getElementById('password-invalid-alert');
const confirmPasswordMatchAlert = document.getElementById("confirmPassword-match-alert");

// Create variable to save validation status
let validForm;

form.onsubmit = (event) => {
  // Get values of input fields
  const firstnameValue = firstname.value;
  const lastnameValue = lastname.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;


  clearValidation();

  // Validate first name (must not be empty)
  if (!inputNotEmpty(firstnameValue)) {
    setInvalid(firstnameEmptyAlert, firstname);
  } else if (!nameValid(firstnameValue)) {
    setInvalid(firstnameInvalidAlert, firstname);
  };

  // Validate last name (must not be empty)
  if (!inputNotEmpty(lastnameValue)) {
    setInvalid(lastnameEmptyAlert, lastname);
  } else if (!nameValid(lastnameValue)) {
    setInvalid(lastnameInvalidAlert, lastname);
  };

  // Validate email (must not be empty)
  if (!inputNotEmpty(emailValue)) {
    setInvalid(emailEmptyAlert, email);
  } else if (!checkemail(emailValue)) {
    setInvalid(emailInvalidAlert, email);
  };

  // Validate password (must not be empty)
  if (!inputNotEmpty(passwordValue)) {
    setInvalid(passwordEmptyAlert, password);
  } else if (!checkpassword(passwordValue)) {
    setInvalid(passwordInvalidAlert, password);
  };

  // Validate password (must not be empty)
  if (!inputNotEmpty(confirmPasswordValue)) {
    setInvalid(confirmPasswordEmptyAlert, confirmPassword);
  } else if (!checkpassword(confirmPasswordValue)) {
    setInvalid(confirmPasswordMatchAlert, confirmPassword);
  };

// At least 8 chars

// Contains at least one digit

// Contains at least one lower alpha char and one upper alpha char

// Contains at least one char within a set of special chars (@#%$^ etc.)

// Does not contain space, tab, etc.



  if (!inputNotEmpty(confirmPasswordValue)) {
    setInvalid(confirmPasswordEmptyAlert, confirmPassword);
  };

  if (!validForm) {
    event.preventDefault();
  };
};

const inputNotEmpty = (inputValue) => inputValue !== '';

// function checkname(variable) {
//   let str = /^[a-zA-Z][^0-9_.,!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/
//   return str.test(variable)
// }

const nameValid = (inputValue) => {
  const nameRegex = /^[a-zA-Z][^0-9_.,!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/;
  return nameRegex.test(inputValue);
};

function checkemail(variable) {
  let str = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return str.test(variable)
}

function checkpassword (variable) {
  let str = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
  return str.test(variable)
}

const setInvalid = (inputAlert, input) => {
  inputAlert.style.display = 'inline';
  input.style.border = 'solid 1px red';
  validForm = false;
};

const clearValidation = () => {
  validForm = true;

  firstnameEmptyAlert.style.display = 'none';
  lastnameEmptyAlert.style.display = 'none';
  emailEmptyAlert.style.display = 'none';
  passwordEmptyAlert.style.display = 'none';
  confirmPasswordEmptyAlert.style.display = 'none';


  firstname.style.border = '';
  lastname.style.border = '';
  email.style.border = '';
  password.style.border = '';
  confirmPassword.style.border = '';

};
