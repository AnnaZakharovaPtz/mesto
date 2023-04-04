class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
  }

  _checkInputValidity(input) {
    const inputError = document.querySelector(`#${input.id}-error`);

    if (!input.validity.valid) {
      input.classList.add(this._config.inputErrorClass);
      inputError.textContent = input.validationMessage;
    } else {
      input.classList.remove(this._config.inputErrorClass);
      inputError.textContent = '';
    }
  }

  toggleButton() {
    const buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    const isFormValid = this._form.checkValidity();
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  _addInputListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    inputList.forEach((item) => {
      item.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('input', () => {
      this.toggleButton();
    });

    this._addInputListeners();
    this.toggleButton();
  }
}

export default FormValidator;
