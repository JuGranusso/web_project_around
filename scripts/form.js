const formBodyElement = document.querySelector(".form__body");
const formElement = document.querySelector(".form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#nome");
  const jobInput = document.querySelector("#profissao");

  const profileName = document.querySelector(".profile__name");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  if (nameInput.value !== "") {
    profileName.textContent = nameInput.value;
  }

  if (jobInput.value !== "") {
    profileSubtitle.textContent = jobInput.value;
  }

  formElement.classList.remove("form_visible");
}

formBodyElement.addEventListener("submit", handleProfileFormSubmit);

const editButtonElement = document.querySelector(".profile__edit");

function handleEditButtonClick(evt) {
  const nameInput = document.querySelector("#nome");
  const jobInput = document.querySelector("#profissao");

  const profileName = document.querySelector(".profile__name");
  const profileSubtitle = document.querySelector(".profile__subtitle");

  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;

  formElement.classList.add("form_visible");
}
editButtonElement.addEventListener("click", handleEditButtonClick);

const exitButtonElement = document.querySelector(".form__exit");

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
