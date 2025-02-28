import { cardsTemplate, myID } from '../index.js';
import { addNewLike, deleteLike } from '../api.js';

export function createCard(item, popupDeleteCard, formDeleteCard, {openDeleteCard, likeCard, openPopupImg, openPopup, closePopup}) {
      const cloneCards = cardsTemplate.querySelector('.places__item').cloneNode(true);
      const cloneCardsImg = cloneCards.querySelector('.card__image');
      const cloneCardsName = cloneCards.querySelector('.card__title');
      const deleteButton = cloneCards.querySelector('.card__delete-button');
      const like = cloneCards.querySelector('.card__like-button');
      const likeCount = cloneCards.querySelector('.card__like-count');

      cloneCardsImg.src = item.link;
      cloneCardsImg.alt = item.name;
      cloneCardsName.textContent = item.name;
      likeCount.textContent = item.likes.length;
      cloneCards.dataset.id = item.id;

      if(item.ownerId !== myID){
        deleteButton.style.display = 'none';
      } else {
        deleteButton.addEventListener('click', () => {
          openPopup(popupDeleteCard);
          openDeleteCard(cloneCards, formDeleteCard, popupDeleteCard, { closePopup })
      });
      }

      if(item.likes.some((user) => user._id == myID)) {
        like.classList.add('card__like-button_is-active');
      }

      cloneCardsImg.addEventListener('click', openPopupImg);
      like.addEventListener('click', () => {
        likeCard(cloneCards.dataset.id, like, likeCount);
      });

      return cloneCards;
    }

export function likeCard(cardId, like, likeCount) {
        if(!like.classList.contains('card__like-button_is-active')) {
          addNewLike(cardId)
            .then((likeCard) => {
              likeCount.textContent = likeCard.likes.length;
              like.classList.add('card__like-button_is-active');
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        } else {
          deleteLike(cardId)
            .then((likeCard) => {
              likeCount.textContent = likeCard.likes.length;
              like.classList.remove('card__like-button_is-active');
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        }
      }