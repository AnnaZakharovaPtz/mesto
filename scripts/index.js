let editButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.profile-edit-popup');
let closePopupButton = editPopup.querySelector('.profile-edit-popup__close');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let popupForm = editPopup.querySelector('.profile-edit-popup__form');
let profileNameInput = popupForm.querySelector('#profile-name');
let profileJobInput = popupForm.querySelector('#profile-job');


function handleEditButtonClick() {
  editPopup.classList.add('profile-edit-popup_opened');

  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function handleClosePopupButtonClick() {
  editPopup.classList.remove('profile-edit-popup_opened');
}

function handlePopupFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  handleClosePopupButtonClick();
}

editButton.addEventListener('click', handleEditButtonClick);
closePopupButton.addEventListener('click', handleClosePopupButtonClick);
popupForm.addEventListener('submit', handlePopupFormSubmit);
