export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
