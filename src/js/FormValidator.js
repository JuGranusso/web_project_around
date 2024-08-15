export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
  }

  _handleSubmit(event) {
    event.preventDefault();
  }

  _checkInputValidity(inputElement) {
    const { errorClass, inputErrorClass } = this.config;

    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(errorClass);
      inputElement.classList.add(inputErrorClass);
    } else {
      errorElement.classList.remove(errorClass);
      inputElement.classList.remove(inputErrorClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const { inputSelector, submitButtonSelector, inactiveButtonClass } =
      this.config;

    const inputList = Array.from(
      this.formElement.querySelectorAll(inputSelector)
    );
    const buttonElement = this.formElement.querySelector(submitButtonSelector);

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector)
    );

    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", this._handleSubmit);

    this._setEventListeners();
  }
}
