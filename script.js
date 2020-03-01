import Router from './router.js';

let router = new Router();
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input, errorMessage) {
  const formContol = input.parentElement;
  formContol.className = 'form-control error';
  const small = formContol.querySelector('small');
  small.innerText = errorMessage;
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}
//show success outline
function showSuccess(input) {
  const formContol = input.parentElement;
  formContol.className = 'form-control success';
}

// check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFielName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}
// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFielName(input)} must be at least ${min}`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFielName(input)} must be less than ${max} characters`
    );
  }
}
// check match password
function checkPasswordMatch(input1, input2) {
  if (input1 !== input2) {
    showError(input2, 'Password do not match');
  }
  showSuccess(input2);
}
// get FieldName
function getFielName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  router.get('/', function(req) {
    console.log(req.path);
  });
  router.init();
  console.log('router :', router);
  console.log('windows.loc :', window.location.pathname);
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
