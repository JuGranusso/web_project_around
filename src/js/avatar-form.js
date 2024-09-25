import { PopupWithForm } from "./PopupWithForm";
import { FormValidator } from "./FormValidator.js";
import { userInfo } from "./UserInfo.js";
import { api } from "./Api.js";

const avatarFormElement = document.querySelector(".avatar-form");
const profileImage = document.querySelector(".profile__photo");

const onSubmitForm = ({ link }) => {
  return api
    .editUserAvatar({ avatar: link })
    .then(({ name, about, avatar }) =>
      userInfo.setUserInfo({
        name,
        avatar,
        subtitle: about,
      })
    )
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

const avatarForm = new PopupWithForm("avatar-form", onSubmitForm);
avatarForm.setEventListeners();

const formValidator = new FormValidator(
  {
    inputSelector: ".avatar-form__input",
    submitButtonSelector: ".avatar-form__button",
    inactiveButtonClass: "avatar-form__button_inactive",
    inputErrorClass: "avatar-form__input_invalid",
    errorClass: "avatar-form__error_visible",
  },
  avatarFormElement
);

formValidator.enableValidation();

function handleProfileImageClick() {
  avatarForm.open();
}

profileImage.addEventListener("click", handleProfileImageClick);
