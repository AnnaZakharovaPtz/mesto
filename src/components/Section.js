export default class Section {
  constructor(selector) {
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemToStart(element) {
    this._container.prepend(element);
  }
}
