import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";

const formElement = document.querySelector(".form");
const editButtonElement = document.querySelector(".profile__edit");

const onSubmitForm = ({ nome, profissao }) => {
  const profileName = document.querySelector(".profile__name");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  if (nome !== "") {
    profileName.textContent = nome;
  }

  if (profissao !== "") {
    profileSubtitle.textContent = profissao;
  }
};

const form = new PopupWithForm("form", onSubmitForm);
form.setEventListeners();

const formValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_invalid",
    errorClass: "form__error_visible",
  },
  formElement
);

formValidator.enableValidation();

function handleEditButtonClick(evt) {
  const profileName = document.querySelector(".profile__name");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  form.open({
    nome: profileName.textContent,
    profissao: profileSubtitle.textContent,
  });
}
editButtonElement.addEventListener("click", handleEditButtonClick);
