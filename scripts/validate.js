const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (config) => {
  const formElement = document.querySelector(config.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const checkInputValidity = (inputElement, config) => {
  const formElement = document.querySelector(config.formSelector);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
  } else {
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
  }
};

const setEventListeners = (config) => {
  const formElement = document.querySelector(config.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  toggleButtonState(config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, config);
      toggleButtonState(config);
    });
  });
};

export const enableValidation = (config) => {
  const formElement = document.querySelector(config.formSelector);

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  setEventListeners(config);
};
