import { cardsTemplate, myID, popupDeleteCard, formDeleteCard } from '../index.js';
import { deleteMyCard, addNewLike, deleteLike } from '../api.js';
import { openPopup, closePopup } from './modal.js';

export function createCard(item, {openDeleteCard, likeCard, openPopupImg}) {
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
          openDeleteCard(cloneCards)
      });
      }

      if(item.likes.some((user) => user._id == myID)) {
        like.classList.add('card__like-button_is-active');
      }

      cloneCardsImg.addEventListener('click', openPopupImg);
      like.addEventListener('click', likeCard);

      return cloneCards;
    }

export function openDeleteCard(cardElement) {
        openPopup(popupDeleteCard);
        formDeleteCard.onsubmit = (evt) => {
          evt.preventDefault();
          const cardId = cardElement.dataset.id;
          deleteMyCard(cardId)
          .then(() => {
            cardElement.remove();
            closePopup(popupDeleteCard);
          })
          .catch((err) => {
            console.log(err);
          })
        }
      }

export function likeCard(evt) {
        const listItem = evt.target.closest('.places__item');
        const cardId = listItem.dataset.id;
        const likeCount = listItem.querySelector('.card__like-count'); 
        if(!evt.target.classList.contains('card__like-button_is-active')) {
          addNewLike(cardId)
            .then((likeCard) => {
              likeCount.textContent = likeCard.likes.length;
              evt.target.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
          
        } else {
          deleteLike(cardId)
            .then((likeCard) => {
              likeCount.textContent = likeCard.likes.length;
              evt.target.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      }