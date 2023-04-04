import "./index.css";
import initialCards from "../utils/cards.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import validationConfig from "../utils/validationConfig.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

function handleCardImageClick(name, link) {
  cardImagePopup.open(link, name);
}

function handleProfileEditButtonClick() {
  const data = userInfo.getUserInfo();
  const popupForm = profilePopup.getForm('.form');
  popupForm.querySelector('#profile-name').value = data.userName;
  popupForm.querySelector('#profile-job').value = data.userInfo;
  profileFormValidator.toggleButton();
  profilePopup.open();
}

function handleCardAddButtonClick() {
  newCardFormValidator.toggleButton();
  newCardPopup.open();
}


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'
});
userInfo.setUserInfo('Жак-Ив Кусто', 'Исследователь океана');

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(
      cardItem.name,
      cardItem.link,
      '#card',
      handleCardImageClick
    );
    const cardElement = card.createCard();
    cardsList.addItem(cardElement);
  }
},
  '.cards'
);
cardsList.renederItems();

const cardImagePopup = new PopupWithImage('#card-image-popup');
cardImagePopup.setEventListeners();

const profilePopup = new PopupWithForm({
  selector: '#profile-popup',
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData['name'], userData['job']);
    profilePopup.close();
  }
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  selector: '#new-card-popup',
  handleFormSubmit: (cardData) => {
    const newCard = new Card(
      cardData['place-name'],
      cardData['place-img'],
      '#card',
      handleCardImageClick
    );
    const cardElement = newCard.createCard();
    cardsList.addItem(cardElement);
    newCardPopup.close();
  }
});
newCardPopup.setEventListeners();

const profileFormValidator = new FormValidator(
  validationConfig,
  profilePopup.getForm('.form'));
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardPopup.getForm('.form'));
newCardFormValidator.enableValidation();

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
cardAddButton.addEventListener('click', handleCardAddButtonClick);
