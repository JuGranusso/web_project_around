const cardFormBodyElement = document.querySelector(".card-form__body");
const cardFormElement = document.querySelector(".card-form");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link");
const addCardButton = document.querySelector(".profile__add");
const exitCardButtonElement = document.querySelector(".card-form__exit");

function handleAddCardButtonClick(evt) {
  cardFormElement.classList.add("card-form_visible");
}

addCardButton.addEventListener("click", handleAddCardButtonClick);

function handleOverlayClick(evt) {
  evt.stopPropagation();
  if (evt.target === cardFormElement) {
    cardFormElement.classList.remove("card-form_visible");
  }
}

cardFormElement.addEventListener("click", handleOverlayClick);

function handleExitCardButtonClick(evt) {
  cardFormElement.classList.remove("card-form_visible");
}

exitCardButtonElement.addEventListener("click", handleExitCardButtonClick);
