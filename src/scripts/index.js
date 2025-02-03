// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import { initialCards } from "./cards.js";
import { renderCard } from "./components/card.js";
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

export { cardsTemplate, cardsList, popupImg, popupImage, popupCaption };

popup.forEach((item) => item.classList.add("popup_is-animated"));

renderCard(initialCards);

function openFormAddCard() {
  openPopup(newCard);
  const form = document.forms["new-place"];
  const nameCard = form.querySelector(
    ".popup__input.popup__input_type_card-name"
  );
  nameCard.focus();
  form.addEventListener("submit", saveCard);
}

function saveCard(evt) {
  evt.preventDefault();

  const nameCard = evt.target.querySelector(
    ".popup__input.popup__input_type_card-name"
  ).value;
  const linkImg = evt.target.querySelector(
    ".popup__input.popup__input_type_url"
  ).value;

  if (nameCard && linkImg) {
    //проверка на заполнение полей
    initialCards.push({
      name: nameCard,
      link: linkImg,
    });
    evt.target.reset();
    closePopup(newCard);
    renderCard([initialCards[initialCards.length - 1]]); // рендер только последней карточки
  }
}

function openFormProfile() {
  const form = document.forms["edit-profile"];
  form.querySelector(".popup__input_type_name").value = nameProfile.textContent;
  form.querySelector(".popup__input_type_description").value =
    profileDescription.textContent;
  openPopup(profileEdit);
  form.querySelector(".popup__input_type_name").focus();
  form.addEventListener("submit", saveInfo);
}

function saveInfo(evt) {
  evt.preventDefault();

  const name = evt.target.querySelector(".popup__input_type_name").value;
  const description = evt.target.querySelector(
    ".popup__input_type_description"
  ).value;

  if (name && description) {
    nameProfile.textContent = name;
    profileDescription.textContent = description;
    evt.target.reset();
    closePopup(profileEdit);
  }
}

addButton.addEventListener("click", openFormAddCard);
profileEditButton.addEventListener("click", openFormProfile);
