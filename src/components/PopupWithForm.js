import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {

    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._popup.querySelectorAll('.form__input');
    this._formElement = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.form__save');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((element) => {
      inputValues[element.name] = element.value;
    });
    return inputValues;
  }

  getForm() {
    return this._formElement;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputElements.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setButtonState(text) {
    this._submitButton.textContent = text;
  }

}
