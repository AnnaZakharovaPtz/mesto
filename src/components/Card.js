export default class Card {
  constructor({ data, selector, handleImageClick, handleLikeButtonClick, handleDeleteButtonClick }) {
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._imageLink = data.link;
    this._likeCounter = data.likes.length;
    this._likes = data.likes;
    this._templateId = selector;
    this._handleImageClick = handleImageClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  _handleDeleteButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this._likeButton, this._id);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._id);
    });

    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this._name, this._imageLink);
    });
  }

  updateLikeCounter(likes) {
    this._likeCounter = likes;
    this._likeCounterElement.textContent = this._likeCounter;
  }

  createCard(userId) {
    const cardTemplate = document.querySelector(this._templateId).content;
    this._cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._likeCounterElement = this._cardElement.querySelector('.cards__like-counter');
    this._likeCounterElement.textContent = this._likeCounter;
    this._likes.forEach(item => {
      if (item._id === userId) {
        this._likeButton.classList.add('cards__like-button_active');
      }
    });

    this._deleteButton = this._cardElement.querySelector('.cards__delete-button');
    if (this._ownerId === userId) {
      this._deleteButton.hidden = false;
    } else {
      this._deleteButton.hidden = true;
    }

    this._imageElement = this._cardElement.querySelector('.cards__image');
    this._imageElement.src = this._imageLink;
    this._imageElement.alt = this._name;
    this._cardElement.querySelector('.cards__name').textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}

