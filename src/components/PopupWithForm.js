import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    let inputValues = {};
    const inputElements = this._popup.querySelectorAll('.form__input');
    inputElements.forEach((element) => {
      inputValues[element.name] = element.value;
    });
    return inputValues;
  }

  getForm(selector) {
    return this._popup.querySelector(selector);
  }

  close() {
    super.close();
    this._popup.querySelector('.form').reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

}
