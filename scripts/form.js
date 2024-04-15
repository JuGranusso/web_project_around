let formBodyElement = document.querySelector(".form__body");
let formElement = document.querySelector(".form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#nome");
  let jobInput = document.querySelector("#profissao");

  let profileName = document.querySelector(".profile__name");
  let profileSubtitle = document.querySelector(".profile__subtitle");

  if (nameInput.value !== "") {
    profileName.textContent = nameInput.value;
  }

  if (jobInput.value !== "") {
    profileSubtitle.textContent = jobInput.value;
  }

  formElement.classList.remove("form_visible");
}

formBodyElement.addEventListener("submit", handleProfileFormSubmit);

let editButtonElement = document.querySelector(".profile__edit");

function handleEditButtonClick(evt) {
  let nameInput = document.querySelector("#nome");
  let jobInput = document.querySelector("#profissao");

  let profileName = document.querySelector(".profile__name");
  let profileSubtitle = document.querySelector(".profile__subtitle");

  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;

  formElement.classList.add("form_visible");
}
editButtonElement.addEventListener("click", handleEditButtonClick);

let exitButtonElement = document.querySelector(".form__exit");

function handleExitButtonClick(evt) {
  formElement.classList.remove("form_visible");
}

exitButtonElement.addEventListener("click", handleExitButtonClick);

function handleOverlayClick(evt) {
  evt.stopPropagation();
  if (evt.target === formElement) {
    formElement.classList.remove("form_visible");
  }
}

formElement.addEventListener("click", handleOverlayClick);
