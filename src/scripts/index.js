// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { createCard, openDeleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation, showErrors } from "./components/validation.js";
import { getUserInfo, getInitialCards, updateProfile, addNewCard, setNewAvatar, isValidImageUrl } from "./api.js";

const cardsTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector(".popup_type_new-card");
const newAvatar = document.querySelector(".popup_type_new-avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");
const popupImg = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const nameProfile = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const popup = document.querySelectorAll(".popup");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const formNewPlace = document.forms["new-place"];
const nameCardNewPlace = formNewPlace.elements["place-name"];
const linkImgNewPlace = formNewPlace.elements["link"];
const formEditProfile = document.forms["edit-profile"];
const nameEditProfile = formEditProfile.elements["name"];
const descriptionEditProfile = formEditProfile.elements["description"];
const closePopupButton = document.querySelectorAll(".popup__close");
const formNewAvatar = document.forms["new-avatar"];
const linkNewAvatar = formNewAvatar.elements["link"];
const formDeleteCard = document.forms["delete-card"];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let myID;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    nameProfile.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    avatar.style.backgroundImage = `url('${userInfo.avatar}')`;
    myID = userInfo._id;
    cards.forEach((card) => {
      renderCard([{name:card.name, 
                  link:card.link, 
                  likes:card.likes,
                  id:card._id,
                  ownerId:card.owner._id}]);
    });
    
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

popup.forEach((item) => item.classList.add("popup_is-animated"));// Добавление всем ".popup" класс ".popup_is-animated"
closePopupButton.forEach((item) => item.addEventListener("click",(evt) => closePopup(evt.target.closest(".popup"))));

function renderCard(card, method = 'append') {
  card.forEach((item)=>{
  const cardElement = createCard(item, {openDeleteCard, likeCard, openPopupImg});
  cardsList[ method ](cardElement);
});}

function openPopupImg(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupImg);
}

function openFormAddCard() {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(newCard);
  nameCardNewPlace.focus();
}

function openFormNewAvatar() {
  formNewAvatar.reset();
  clearValidation(formNewAvatar, validationConfig);
  openPopup(newAvatar);
  linkNewAvatar.focus();
}

function uxButton(formElement, boolean) {
  if (boolean) {
    formElement.querySelector('button[type="submit"]').textContent = 'Сохранение...'
  } else {
    formElement.querySelector('button[type="submit"]').textContent = 'Сохранить'
  }
}

function saveCard(evt) {
  evt.preventDefault();
  uxButton(formNewPlace, true);
  isValidImageUrl(linkImgNewPlace.value).then((isValid) => {
    if(isValid) {
      addNewCard(nameCardNewPlace.value, linkImgNewPlace.value)
      .then((newCard) => {
      renderCard([{
        name:newCard.name, 
        link:newCard.link, 
        likes:newCard.likes,
        id:newCard._id,
        ownerId:myID
      }], 'prepend')
    })
    .catch((err) => console.log(`Error: ${err}`));
    evt.target.reset();
    closePopup(newCard);
    } else {
      showErrors(formNewPlace, linkImgNewPlace, "Это не изображение!", validationConfig);
    }
  }).finally(() => {
    uxButton(formNewPlace, false);
  })
}

function openFormProfile() {
  formEditProfile.reset();
  nameEditProfile.value = nameProfile.textContent;
  descriptionEditProfile.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(profileEdit);
  nameEditProfile.focus();
}

function saveInfo(evt) {
  evt.preventDefault();
  uxButton(formEditProfile, true);
  nameProfile.textContent = nameEditProfile.value.trim();
  profileDescription.textContent = descriptionEditProfile.value.trim();
  updateProfile(nameEditProfile.value.trim(), descriptionEditProfile.value.trim())
    .finally(() => {
      uxButton(formEditProfile, false);
    });
  closePopup(profileEdit);
}

function saveNewAvatar(evt) {
  evt.preventDefault();
  uxButton(formNewAvatar, true);
  isValidImageUrl(linkNewAvatar.value).then((isValid) => {
    if(isValid) {
      avatar.style.backgroundImage = `url('${linkNewAvatar.value.trim()}')`;
      setNewAvatar(linkNewAvatar.value.trim());
      closePopup(newAvatar);
    } else {
      showErrors(formNewAvatar, linkNewAvatar, "Это не изображение!", validationConfig);
    }
  }).finally(() => {
    uxButton(formNewAvatar, false);
  });
}

addButton.addEventListener("click", openFormAddCard);
profileEditButton.addEventListener("click", openFormProfile);
avatar.addEventListener("click", openFormNewAvatar);
formNewPlace.addEventListener("submit", saveCard);
formEditProfile.addEventListener("submit", saveInfo);
formNewAvatar.addEventListener("submit", saveNewAvatar);

enableValidation(validationConfig);

export { cardsTemplate, cardsList, popupImg, popupImage, popupCaption, openPopupImg, myID, popupDeleteCard, formDeleteCard };