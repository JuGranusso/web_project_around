import { Popup } from "./popup";

export class PopupWithForm extends Popup {
  constructor(popupClass, onSubmitForm) {
    super(popupClass);
    this.onSubmitForm = onSubmitForm;
    this.form = this.popup.querySelector(`.${popupClass}__body`);
    this.popupSubmitButton = this.popup.querySelector('button[type="submit"]');
  }

  _getInputValues() {
    const inputValues = {};
    const inputs = this.form.querySelectorAll("input");

    inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _clearInputs() {
    const inputs = this.form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.value = "";
    });
  }

  _handleSubmitForm(event) {
    event.preventDefault();

    const inputValues = this._getInputValues();

    this.popupSubmitButton.textContent = "Salvando...";

    this.onSubmitForm(inputValues).then(() => {
      this.popupSubmitButton.textContent = "Salvar";

      this.close();
      this._clearInputs();
    });
  }

  open(formValues) {
    if (formValues) {
      const inputs = this.form.querySelectorAll("input");

      inputs.forEach((input) => {
        const formValue = formValues[input.name];
        if (formValue) {
          input.value = formValue;
        }
      });
    }

    super.open();
  }

  close() {
    super.close();
    this._clearInputs();
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (event) =>
      this._handleSubmitForm(event)
    );
  }
}
