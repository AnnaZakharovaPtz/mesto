export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  setRenderedItems(items) {
    this._renderedItems = items;
  }

  renederItems() {
    this._container.innerHTML = '';
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  insertRenderedItem(item) {
    this._renderedItems.unshift(item);
  }

  removeRenderedItem(id) {
    const newItems = this._renderedItems.filter(item => item._id !== id);
    this._renderedItems = newItems;
  }
}
