import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { userInfo } from "./UserInfo.js";

const formElement = document.querySelector(".form");
const editButtonElement = document.querySelector(".profile__edit");

const onSubmitForm = ({ nome, profissao }) => {
  userInfo.setUserInfo({
    name: nome,
    subtitle: profissao,
  });
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

function handleEditButtonClick() {
  const { name, subtitle } = userInfo.getUserInfo();

  form.open({
    nome: name,
    profissao: subtitle,
  });
}
editButtonElement.addEventListener("click", handleEditButtonClick);
