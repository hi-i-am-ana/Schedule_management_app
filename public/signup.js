    const form = document.getElementById('form');

    // Select input fields
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');

     // Select validation alerts
     const firstnameEmptyAlert = document.getElementById('firstname-empty-alert');
     const lastnameEmptyAlert = document.getElementById('lastname-empty-alert');
     const emailEmptyAlert = document.getElementById('email-empty-alert');
     const passwordEmptyAlert = document.getElementById('password-empty-alert');
    
     
     // TODO: Delete if we don't have modal
     // const closeModalButton = document.getElementById('close-modal-button');
     // const modal = document.getElementById('modal');
     
     // Create variable to save validation status
     let validForm;
     
     form.onsubmit = (event) => {
       // Get values of input fields
       const firstnameValue = firstname.value;
       const lastnameValue = lastname.value;
       const emailValue = email.value;
       const passwordValue = password.value;
       
     
       clearValidation();
     
       // Validate first name (must not be empty)
       if (!inputNotEmpty(firstnameValue)) {
         setInvalid(firstnameEmptyAlert, firstname);
       };
     
       // Validate last name (must not be empty)
       if (!inputNotEmpty(lastnameValue)) {
         setInvalid(lastnameEmptyAlert, lastname);
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
     
     // TODO: Delete if we don't have modal
     // closeModalButton.onclick = (event) => {
     //   modal.classList.remove('display-block');
     // }
     
     const inputNotEmpty = (inputValue) => inputValue !== '';
     
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
       
     
       firstname.style.border = '';
       lastname.style.border = '';
       email.style.border = '';
       password.style.border = '';
       
     };