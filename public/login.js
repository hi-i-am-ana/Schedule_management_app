const form = document.getElementById('form');

// Select input fields
const email = document.getElementById('email');
const password = document.getElementById('password');

// Select validation alerts
const emailEmptyAlert = document.getElementById('email-empty-alert');
const passwordEmptyAlert = document.getElementById('password-empty-alert');

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