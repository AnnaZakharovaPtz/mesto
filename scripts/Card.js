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
    this._deleteButton.closest('.cards__item').remove();
  }

  createCard() {
    const cardTemplate = document.querySelector(this._templateId).content;
    this._cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

    this._cardElement.querySelector('.cards__image').src = this._imageLink;
    this._cardElement.querySelector('.cards__image').alt = this._name;
    this._cardElement.querySelector('.cards__name').textContent = this._name;

    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._likeButton.addEventListener('click', this._handleLikeButton);

    this._deleteButton = this._cardElement.querySelector('.cards__delete-button');
    this._deleteButton.addEventListener('click', this._handleDeleteButton);

    this._imageElement = this._cardElement.querySelector('.cards__image');
    this._imageElement.addEventListener('click', () => { this._handleImageClick(this._name, this._imageLink) });

    return this._cardElement;
  }
}

export default Card;
