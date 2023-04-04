import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(link, name) {
    const imageElement = this._popup.querySelector('.fullscreen-mode__image');
    const captionElement = this._popup.querySelector('.fullscreen-mode__caption');
    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;
    super.open();
  }
}
