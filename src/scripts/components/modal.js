export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
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
    closePopup(document.querySelector(".popup_is-opened")); 
  }
}
