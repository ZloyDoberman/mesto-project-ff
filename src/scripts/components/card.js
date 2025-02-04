import { cardsTemplate } from '../index.js';

export function createCard(item, {deleteCard, likeCard, openPopupImg}) {
      const cloneCards = cardsTemplate.querySelector('.places__item').cloneNode(true);
      const cloneCardsImg = cloneCards.querySelector('.card__image');
      const cloneCardsName = cloneCards.querySelector('.card__title');
      const deleteButton = cloneCards.querySelector('.card__delete-button');
      const like = cloneCards.querySelector('.card__like-button');

      cloneCardsImg.src = item.link;
      cloneCardsImg.alt = item.name;
      cloneCardsName.textContent = item.name;

      cloneCardsImg.addEventListener('click', openPopupImg);
      like.addEventListener('click', likeCard);
      deleteButton.addEventListener('click', deleteCard);

      return cloneCards;
    }

export function deleteCard(evt) {
        const listItem = evt.target.closest('.places__item');
        listItem.remove();
      }

export function likeCard(evt) {
        evt.target.classList.toggle('card__like-button_is-active');
      }