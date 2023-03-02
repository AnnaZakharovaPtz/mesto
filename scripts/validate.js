function checkInputValidity(input, config) {
  const inputError = document.querySelector(`#${input.id}-error`);

  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    inputError.textContent = input.validationMessage;
  } else {
    input.classList.remove(config.inputErrorClass);
    inputError.textContent = '';
  }
}

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((item) => {
    item.addEventListener('input', (evt) => {
      checkInputValidity(evt.target, config);
    });
  });
}

function validateForm(form, config) {
  form.addEventListener('submit', (evt) => evt.preventDefault());
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });

  addInputListeners(form, config);
  toggleButton(form, config);
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((item) => {
    validateForm(item, config);
  });
}
