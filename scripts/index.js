// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

    function createCard(item, {deleteCard}) {
      const cloneCards = cardsTemplate.querySelector('.places__item').cloneNode(true);
      const cloneCardsImg = cloneCards.querySelector('.card__image');
      const cloneCardsName = cloneCards.querySelector('.card__title');
      const deleteButton = cloneCards.querySelector('.card__delete-button');
      cloneCardsImg.src = item.link;
      cloneCardsImg.alt = item.name;
      cloneCardsName.textContent = item.name;
      deleteButton.addEventListener('click', deleteCard);
      return cloneCards;
    }
    function renderCard(card, method = 'prepend') {
        card.forEach((item)=>{
        const cardElement = createCard(item, {deleteCard});
        cardsList[ method ](cardElement);
      });}

    renderCard(initialCards);

      function deleteCard(evt) {
        const listItem = evt.target.closest('.places__item');
        listItem.remove();
      }