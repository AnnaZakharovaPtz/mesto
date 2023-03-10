const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

const cardImagePopup = document.querySelector('#card-image-popup');
const cardImagePopupCloseButton = cardImagePopup.querySelector('.popup__close');
const cardPopupImageElement = cardImagePopup.querySelector('.fullscreen-mode__image');
const cardPopupCaptionElement = cardImagePopup.querySelector('.fullscreen-mode__caption');

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profile-popup');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profilePopupForm = profilePopup.querySelector('.form');
const profileNameInput = profilePopupForm.querySelector('#profile-name');
const profileJobInput = profilePopupForm.querySelector('#profile-job');

const cardAddButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('#new-card-popup');
const newCardPopupCloseButton = newCardPopup.querySelector('.popup__close');
const newCardPopupForm = newCardPopup.querySelector('.form');
const newCardNameInput = newCardPopupForm.querySelector('#place-name');
const newCardImageInput = newCardPopupForm.querySelector('#place-image');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input_type_error'
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupOnOverlay(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
}

function handleCardImageClick(item) {
  cardPopupImageElement.src = item.link;
  cardPopupImageElement.alt = item.name;
  cardPopupCaptionElement.textContent = item.name;
  openPopup(cardImagePopup);
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardLikeButton = cardElement.querySelector('.cards__like-button');
  const cardDeleteButton = cardElement.querySelector('.cards__delete-button');

  cardElement.querySelector('.cards__image').src = item.link;
  cardElement.querySelector('.cards__image').alt = item.name;
  cardElement.querySelector('.cards__name').textContent = item.name;

  cardImage.addEventListener('click', () => handleCardImageClick(item));
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('cards__like-button_active');
  });
  cardDeleteButton.addEventListener('click', () => {
    const cardsItem = cardDeleteButton.closest('.cards__item');
    cardsItem.remove();
  });

  return cardElement;
}

function loadCards() {
  initialCards.forEach(function (item) {
    const card = createCard(item);
    cardsContainer.append(card);
  });
}

function handleProfileEditButtonClick() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  toggleButton(profilePopupForm, validationConfig);
  openPopup(profilePopup);
}

function handleProfilePopupFormSubmit() {
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}

function handleCardAddButtonClick() {
  newCardPopupForm.reset();
  toggleButton(newCardPopupForm, validationConfig);
  openPopup(newCardPopup);
}

function handleNewCardPopupFormSubmit() {
  const cardData = { 'name': newCardNameInput.value, 'link': newCardImageInput.value };
  const cardElement = createCard(cardData);
  cardsContainer.prepend(cardElement);
  closePopup(newCardPopup);
}

loadCards();

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);
cardAddButton.addEventListener('click', handleCardAddButtonClick);
newCardPopupForm.addEventListener('submit', handleNewCardPopupFormSubmit);
cardImagePopupCloseButton.addEventListener('click', () => {
  closePopup(cardImagePopup);
});
profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});
newCardPopupCloseButton.addEventListener('click', () => {
  closePopup(newCardPopup);
});
cardImagePopup.addEventListener('click', (evt) => {
  closePopupOnOverlay(evt, cardImagePopup);
});
profilePopup.addEventListener('click', (evt) => {
  closePopupOnOverlay(evt, profilePopup);
});
newCardPopup.addEventListener('click', (evt) => {
  closePopupOnOverlay(evt, newCardPopup);
});

enableValidation(validationConfig);
