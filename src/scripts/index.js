// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { createCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation, showErrors } from "./components/validation.js";
import { getUserInfo, getInitialCards, updateProfile, addNewCard, setNewAvatar, isValidImageUrl, deleteMyCard } from "./api.js";

const cardsTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector(".popup_type_new-card");
const newAvatar = document.querySelector(".popup_type_new-avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");
const popupImg = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");
const nameProfile = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const popupList = document.querySelectorAll(".popup");
const formNewPlace = document.forms["new-place"];
const nameCardNewPlace = formNewPlace.elements["place-name"];
const linkImgNewPlace = formNewPlace.elements["link"];
const formEditProfile = document.forms["edit-profile"];
const nameEditProfile = formEditProfile.elements["name"];
const descriptionEditProfile = formEditProfile.elements["description"];
const closePopupButtonList = document.querySelectorAll(".popup__close");
const formNewAvatar = document.forms["new-avatar"];
const linkNewAvatar = formNewAvatar.elements["link"];
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
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

popupList.forEach((popup) => popup.classList.add("popup_is-animated"));// Добавление всем ".popup" класс ".popup_is-animated"
closePopupButtonList.forEach((closePopupButton) => closePopupButton.addEventListener("click",(evt) => closePopup(evt.target.closest(".popup"))));

function renderCard(card, method = 'append') {
  card.forEach((item)=>{
  const cardElement = createCard(item, popupDeleteCard, formDeleteCard, {openDeleteCard, likeCard, openPopupImg, openPopup, closePopup});
  cardsList[ method ](cardElement);
});}

function openPopupImg(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImgCaption.textContent = evt.target.alt;
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
      .then((itemNewCard) => {
      renderCard([{
        name:itemNewCard.name, 
        link:itemNewCard.link, 
        likes:itemNewCard.likes,
        id:itemNewCard._id,
        ownerId:myID
      }], 'prepend');
      closePopup(newCard);
      evt.target.reset();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      showErrors(formNewPlace, linkImgNewPlace, "Это не изображение!", validationConfig);
    }
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {
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
  updateProfile(nameEditProfile.value.trim(), descriptionEditProfile.value.trim())
    .then((res) => {
        nameProfile.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(profileEdit);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      uxButton(formEditProfile, false);
    });
}

function saveNewAvatar(evt) {
  evt.preventDefault();
  uxButton(formNewAvatar, true);
  isValidImageUrl(linkNewAvatar.value).then((isValid) => {
    if(isValid) {
      setNewAvatar(linkNewAvatar.value.trim())
      .then((res) => {
        avatar.style.backgroundImage = `url('${res.avatar}')`;
        closePopup(newAvatar);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      showErrors(formNewAvatar, linkNewAvatar, "Это не изображение!", validationConfig);
    }
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {
    uxButton(formNewAvatar, false);
  });
}

function openDeleteCard(cardElement, formDeleteCard, popupDeleteCard, { closePopup }) {
        formDeleteCard.onsubmit = (evt) => {
          evt.preventDefault();
          const cardId = cardElement.dataset.id;
          deleteMyCard(cardId)
          .then(() => {
            cardElement.remove();
            closePopup(popupDeleteCard);
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
        }
      }

addButton.addEventListener("click", openFormAddCard);
profileEditButton.addEventListener("click", openFormProfile);
avatar.addEventListener("click", openFormNewAvatar);
formNewPlace.addEventListener("submit", saveCard);
formEditProfile.addEventListener("submit", saveInfo);
formNewAvatar.addEventListener("submit", saveNewAvatar);

enableValidation(validationConfig);

export { cardsTemplate, cardsList, popupImg, popupImage, openPopupImg, myID };