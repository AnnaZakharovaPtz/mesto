const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function loadCards() {
  const cardsContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;

  initialCards.forEach(function (item) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__image').src = item.link;
    cardElement.querySelector('.cards__name').textContent = item.name;
    cardsContainer.append(cardElement);
  });
}


const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#profile-popup');
const closeProfilePopupButton = profilePopup.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profilePopupForm = profilePopup.querySelector('.form');
const profileNameInput = profilePopupForm.querySelector('#profile-name');
const profileJobInput = profilePopupForm.querySelector('#profile-job');

function handleEditButtonClick() {
  profilePopup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function handlePopupFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  handleCloseProfilePopupButtonClick();
}

function handleCloseProfilePopupButtonClick() {
  profilePopup.classList.remove('popup_opened');
}


const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('#new-card-popup');
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close');

const newCardPopupForm = newCardPopup.querySelector('.form');
const newCardNameInput = newCardPopupForm.querySelector('#place-name');
const newCardImageInput = newCardPopupForm.querySelector('#place-image');

function handleAddCardButtonClick() {
  newCardNameInput.value = '';
  newCardImageInput.value = '';
  newCardPopup.classList.add('popup_opened');
}

function handleNewCardPopupFormSubmit(evt) {
  evt.preventDefault();

  const cardsContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.cards__image').src = newCardImageInput.value;
  cardElement.querySelector('.cards__name').textContent = newCardNameInput.value;
  cardsContainer.prepend(cardElement);

  const delButton = cardElement.querySelector('.cards__delete-button');
  delButton.addEventListener('click', () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('cards__like-button_active');
  });

  handleCloseNewCardPopupButtonClick();
}

function handleCloseNewCardPopupButtonClick() {
  newCardPopup.classList.remove('popup_opened');
}



loadCards();
editButton.addEventListener('click', handleEditButtonClick);
profilePopupForm.addEventListener('submit', handlePopupFormSubmit);
closeProfilePopupButton.addEventListener('click', handleCloseProfilePopupButtonClick);
addCardButton.addEventListener('click', handleAddCardButtonClick);
newCardPopupForm.addEventListener('submit', handleNewCardPopupFormSubmit);
closeNewCardPopupButton.addEventListener('click', handleCloseNewCardPopupButtonClick);



const likeButtonList = document.querySelectorAll('.cards__like-button');

likeButtonList.forEach(likeButton => {
  likeButton.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('cards__like-button_active');
  });
});


const delButtonList = document.querySelectorAll('.cards__delete-button');

delButtonList.forEach(delButton => {
  delButton.addEventListener('click', () => {
    const cardsItem = delButton.closest('.cards__item');
    cardsItem.remove();
  });
});
