const form = document.getElementById('form');

// Select input fields
const email = document.getElementById('email');
const password = document.getElementById('password');

// Select validation alerts
const emailEmptyAlert = document.getElementById('email-empty-alert');
const passwordEmptyAlert = document.getElementById('password-empty-alert');

// Select invalid Alerts
const emailInvalidAlert = document.getElementById('email-invalid-alert');
const passwordInvalidAlert = document.getElementById('password-invalid-alert');

// Create variable to save validation status
let validForm;

form.onsubmit = (event) => {
  // Get values of input fields
  const emailValue = email.value;
  const passwordValue = password.value;

  clearValidation();

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

  // Validate email (must not be empty)
  if (!inputNotEmpty(emailValue)) {
    setInvalid(emailEmptyAlert, email);
  };

  // Validate password (must not be empty)
  if (!inputNotEmpty(passwordValue)) {
    setInvalid(passwordEmptyAlert, password);
  };

  if (!validForm) {
    event.preventDefault();
  };
};

const inputNotEmpty = (inputValue) => inputValue !== '';

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

  emailEmptyAlert.style.display = 'none';
  passwordEmptyAlert.style.display = 'none';

  email.style.border = '';
  password.style.border = '';
};