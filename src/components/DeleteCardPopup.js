import Popup from "./Popup";

export default class DeleteCardPopup extends Popup {
  constructor({ selector, handleOkButtonClick }) {
    super(selector);
    this._handleOkButtonClick = handleOkButtonClick;
    this._okButton = this._popup.querySelector('.question-mode__ok-button');
  }

  setCardId(id) {
    this._cardId = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._okButton.addEventListener('click', () => {
      this._handleOkButtonClick(this._cardId);
    });
  }
}
