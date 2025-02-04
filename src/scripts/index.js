// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const newCard = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEdit = document.querySelector(".popup_type_edit");
const popupImg = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const nameProfile = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popup = document.querySelectorAll(".popup");
const formNewPlace = document.forms["new-place"];
const nameCardNewPlace = formNewPlace.elements["place-name"];
const linkImgNewPlace = formNewPlace.elements["link"];
const formEditProfile = document.forms["edit-profile"];
const nameEditProfile = formEditProfile.elements["name"];
const descriptionEditProfile = formEditProfile.elements["description"];
const closePopupButton = document.querySelectorAll(".popup__close");

popup.forEach((item) => item.classList.add("popup_is-animated"));// Добавление всем ".popup" класс ".popup_is-animated"
closePopupButton.forEach((item) => item.addEventListener("click",(evt) => closePopup(evt.target.closest(".popup"))));
renderCard(initialCards);

function renderCard(card, method = 'prepend') {
  card.forEach((item)=>{
  const cardElement = createCard(item, {deleteCard, likeCard, openPopupImg});
  cardsList[ method ](cardElement);
});}

function openPopupImg(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupImg);
}

function openFormAddCard() {
  openPopup(newCard);
  nameCardNewPlace.focus();
}

function saveCard(evt) {
  evt.preventDefault();
  if (nameCardNewPlace.value && linkImgNewPlace.value) {
  const newCardAdd = [{name:nameCardNewPlace.value, link:linkImgNewPlace.value}];
  renderCard(newCardAdd);
  evt.target.reset();
  closePopup(newCard);
  }
}

function openFormProfile() {
  nameEditProfile.value = nameProfile.textContent;
  descriptionEditProfile.value = profileDescription.textContent;
  openPopup(profileEdit);
  nameEditProfile.focus();
}

function saveInfo(evt) {
  evt.preventDefault();
  if (nameEditProfile.value && descriptionEditProfile.value) {
    nameProfile.textContent = nameEditProfile.value.trim();
    profileDescription.textContent = descriptionEditProfile.value.trim();
    closePopup(profileEdit);
  }
}

addButton.addEventListener("click", openFormAddCard);
profileEditButton.addEventListener("click", openFormProfile);
formNewPlace.addEventListener("submit", saveCard);
formEditProfile.addEventListener("submit", saveInfo);

export { cardsTemplate, cardsList, popupImg, popupImage, popupCaption, openPopupImg };