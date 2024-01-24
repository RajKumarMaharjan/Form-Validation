const form = document.querySelector('form');
const userName = document.getElementById('username')
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');


// Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
};

// Show input success message
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
};

//check email validation
function checkEmail(input){
    const regular =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regular.test(input.value.trim())){
        showSuccess(input)
    } else {
        showError(input, 'Invalid Email')
    }
};

//check required fields
function checkRequired (inputArr){
    let isRequired = false;

    inputArr.forEach(function (input){
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        }else {
            showSuccess(input)
        }
    });

    return !isRequired;
};

//check input length
function checkLength (input, min, max) {
    if (input.value.length < min){
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
          );
    }else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
          );
    }else {
        showSuccess(input)
    }
};

// check password match
function checkPasswordMatch (input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords do not match");
    }
};

// get fieldName
function getFieldName(input) {
    const fieldName = input.id.replace(/-/g, ' ');
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
};

// eventListener

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (checkRequired([userName, email, password, confirmPassword])) {
        checkLength(userName, 2, 20);
        checkLength(password, 6, 20);
        checkEmail(email);
        checkPasswordMatch(password, confirmPassword);
      }
});

