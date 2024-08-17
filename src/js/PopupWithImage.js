import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupClass) {
    super(popupClass);
    this.photoElement = this.popup.querySelector(`.${this.popupClass}__photo`);
  }

  open(name, link) {
    this.photoElement.src = link;
    this.photoElement.alt = name;

    this.popup.querySelector(`.${this.popupClass}__caption`).textContent = name;

    super.open();
  }
}
