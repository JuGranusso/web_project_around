export class Popup {
  constructor(popupClass) {
    this.popupClass = popupClass;
    this.popupVisibleClass = `${this.popupClass}_visible`;
    this.popup = document.querySelector(`.${popupClass}`);
    this.popupCloseButton = this.popup.querySelector(
      `.${this.popupClass}__exit`
    );
  }

  open() {
    this.popup.classList.add(this.popupVisibleClass);
  }

  close() {
    this.popup.classList.remove(this.popupVisibleClass);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    event.stopPropagation();
    if (event.target === this.popup) {
      // this is the overlay element
      this.close();
    }
  }

  setEventListeners() {
    this.popup.addEventListener("click", (event) => {
      this._handleOverlayClick(event);
    });

    document.addEventListener("keyup", (evt) => {
      this._handleEscClose(evt);
    });

    this.popupCloseButton.addEventListener("click", () => this.close());
  }
}
