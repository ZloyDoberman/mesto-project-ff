import { popupImg, popupImage, popupCaption } from "../index.js";

export function openPopupImg(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupImg);
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  const closePopupButton = popup.querySelector(".popup__close");
  closePopupButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", closeOnBackgroundClick);
  document.addEventListener("keydown", closeOnEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeOnBackgroundClick);
  document.removeEventListener("keydown", closeOnEsc);
}

function closeOnBackgroundClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closeOnEsc(evt) {
  if (evt.key === "Escape" || evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
