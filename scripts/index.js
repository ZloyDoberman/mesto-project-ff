// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
  for (let i = 0; i < initialCards.length; i++) {
    const cloneCards = cardsTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cloneCards.querySelector('.card__delete-button');
    const listItem = deleteButton.closest('.places__item');
    cloneCards.querySelector('.card__image').src = initialCards[i].link;
    cloneCards.querySelector('.card__title').textContent = initialCards[i].name;
    cardsList.append(cloneCards);
    deleteButton.addEventListener('click', function () {
      listItem.remove();
    });
    };