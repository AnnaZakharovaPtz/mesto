import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._popup.querySelector('.fullscreen-mode__image');
    this._captionElement = this._popup.querySelector('.fullscreen-mode__caption');
  }

  open(link, name) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}
