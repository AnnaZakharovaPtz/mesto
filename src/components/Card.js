class Card {
  constructor(name, imageLink, templateId, handleImageClick) {
    this._name = name;
    this._imageLink = imageLink;
    this._templateId = templateId;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle('cards__like-button_active');
  }

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButton);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this._name, this._imageLink);
    });
  }

  createCard() {
    const cardTemplate = document.querySelector(this._templateId).content;
    this._cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._deleteButton = this._cardElement.querySelector('.cards__delete-button');

    this._imageElement = this._cardElement.querySelector('.cards__image');
    this._imageElement.src = this._imageLink;
    this._imageElement.alt = this._name;
    this._cardElement.querySelector('.cards__name').textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
