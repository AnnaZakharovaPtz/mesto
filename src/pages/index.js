import "./index.css";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import DeleteCardPopup from "../components/DeleteCardPopup.js";
import FormValidator from "../components/FormValidator.js";
import validationConfig from "../utils/validationConfig.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileImageEditButton = document.querySelector('.profile__edit-image-button');
const cardAddButton = document.querySelector('.profile__add-button');
let userId = '';

function createCard(item) {
  const card = new Card({
    data: item,
    userId: userId,
    selector: '#card',
    handleImageClick: (name, link) => {
      cardImagePopup.open(link, name);
    },
    handleLikeButtonClick: (button, id) => {
      if (button.classList.contains('cards__like-button_active')) {
        api.removeCardLike(id)
          .then(data => {
            card.updateLikes(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.addCardLike(id)
          .then(data => {
            card.updateLikes(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteButtonClick: (id) => {
      deleteCardPopup.setOkHandler(() => {
        api.deleteCard(id)
          .then(() => {
            deleteCardPopup.close();
            card.removeCard();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      deleteCardPopup.open();
    }
  });
  return card.createCard();
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '5ca58e53-9d75-4b47-8595-57d0c6d76af3',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job',
  imageSelector: '.profile__image'
});
const cardsList = new Section('.cards');
const userInfoPromise = api.getUserInfo();
const initialCardsPromise = api.getInitialCards();
const promises = [userInfoPromise, initialCardsPromise];

Promise.all(promises)
  .then((data) => {
    userInfo.setUserInfo(data[0].name, data[0].about, data[0].avatar);
    userId = data[0]._id;
    data[1].forEach((card) => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });


const profilePopup = new PopupWithForm({
  selector: '#profile-popup',
  handleFormSubmit: (userData) => {
    profilePopup.setButtonState('Сохранение...');
    api.editUserInfo(userData['name'], userData['job'])
      .then(data => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        profilePopup.close();
      }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.setButtonState('Сохранить');
      });
  }
});
profilePopup.setEventListeners();

const profileImagePopup = new PopupWithForm({
  selector: '#profile-image-popup',
  handleFormSubmit: (imageData) => {
    profileImagePopup.setButtonState('Сохранение...');
    api.editUserImage(imageData.link)
      .then(data => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        profileImagePopup.close();
      }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileImagePopup.setButtonState('Сохранить');
      });
  }
});
profileImagePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  selector: '#new-card-popup',
  handleFormSubmit: (cardData) => {
    newCardPopup.setButtonState('Сохранение...');
    api.addNewCard(cardData.name, cardData.link)
      .then(data => {
        const newCardElement = createCard(data);
        cardsList.addItemToStart(newCardElement);
        newCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newCardPopup.setButtonState('Создать');
      });
  }
});
newCardPopup.setEventListeners();

const cardImagePopup = new PopupWithImage('#card-image-popup');
cardImagePopup.setEventListeners();

const deleteCardPopup = new DeleteCardPopup({
  selector: '#delete-card-popup',
  handleOkButtonClick: () => { }
});
deleteCardPopup.setEventListeners();

const profileFormValidator = new FormValidator(
  validationConfig,
  profilePopup.getForm());
profileFormValidator.enableValidation();

const profileImageFormValidator = new FormValidator(
  validationConfig,
  profileImagePopup.getForm());
profileImageFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  validationConfig,
  newCardPopup.getForm());
newCardFormValidator.enableValidation();


function handleProfileEditButtonClick() {
  const data = userInfo.getUserInfo();
  profilePopup.setInputValues(data);
  profileFormValidator.toggleButton();
  profilePopup.open();
}

function handleProfileImageEditButtonClick() {
  profileImagePopup.open();
}

function handleCardAddButtonClick() {
  newCardFormValidator.toggleButton();
  newCardPopup.open();
}

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileImageEditButton.addEventListener('click', handleProfileImageEditButtonClick);
cardAddButton.addEventListener('click', handleCardAddButtonClick);
