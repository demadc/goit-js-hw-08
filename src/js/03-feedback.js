import throttle from "lodash.throttle";

const LOCAL_KEY = 'feedback-form-state';
const saveFormEls = document.querySelector('.feedback-form');

saveFormEls.addEventListener('input', throttle(onInputData, 600));
saveFormEls.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = saveFormEls.elements;

reloadPage();

function onInputData(evt) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Please fill the fields!');
  }

  localStorage.removeItem(LOCAL_KEY);
  evt.currentTarget.reset();
  dataForm = {};
}

