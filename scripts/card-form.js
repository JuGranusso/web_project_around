import { enableValidation } from "./validate.js";
import { createNewCard } from "./photo-cards.js";

const cardFormBodyElement = document.querySelector(".card-form__body");
const cardFormElement = document.querySelector(".card-form");
const titleInput = document.querySelector("#title");
const linkInput = document.querySelector("#link");
const addCardButton = document.querySelector(".profile__add");
const exitCardButtonElement = document.querySelector(".card-form__exit");
const submitButton = document.querySelector(".card-form__button");

enableValidation({
  formSelector: ".card-form__body",
  inputSelector: ".card-form__input",
  submitButtonSelector: ".card-form__button",
  inactiveButtonClass: "card-form__button_inactive",
  inputErrorClass: "card-form__input_invalid",
  errorClass: "card-form__error_visible",
});

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

function handleExitCardButtonClick() {
  cardFormElement.classList.remove("card-form_visible");
}

exitCardButtonElement.addEventListener("click", handleExitCardButtonClick);

function handleSubmitButtonClick(evt) {
  evt.preventDefault();

  createNewCard(titleInput.value, linkInput.value);

  titleInput.value = "";
  linkInput.value = "";

  handleExitCardButtonClick();
}

submitButton.addEventListener("click", handleSubmitButtonClick);

document.addEventListener("keyup", (evt) => {
  if (evt.key === "Escape") {
    cardFormElement.classList.remove("card-form_visible");
  }
});
