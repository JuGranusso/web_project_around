import { api } from "./Api.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";

const cardFormElement = document.querySelector(".card-form");
const addCardButton = document.querySelector(".profile__add");

const onSubmitForm = ({ title, link }) => {
  return api
    .createNewCard({ name: title, link })
    .then(() => {
      new Card(title, link).createNewCard();
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

const cardForm = new PopupWithForm("card-form", onSubmitForm);
cardForm.setEventListeners();

const formValidator = new FormValidator(
  {
    inputSelector: ".card-form__input",
    submitButtonSelector: ".card-form__button",
    inactiveButtonClass: "card-form__button_inactive",
    inputErrorClass: "card-form__input_invalid",
    errorClass: "card-form__error_visible",
  },
  cardFormElement
);

formValidator.enableValidation();

function handleAddCardButtonClick() {
  cardForm.open();
}

addCardButton.addEventListener("click", handleAddCardButtonClick);
