import { PopupWithImage } from "./PopupWithImage.js";
import { api } from "./Api.js";
import likeIcon from "../assets/like.svg";
import likedIcon from "../assets/liked.svg";

const photoGrid = document.querySelector(".photo-grid");

const imgPopup = new PopupWithImage("img-popup");
imgPopup.setEventListeners();

const openPopup = (name, link) => {
  imgPopup.open(name, link);
};

export class Card {
  constructor(name, link, openPopup, templateSelector = "#grid-card_template") {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this.openPopup = openPopup;
  }

  _cloneTemplate() {
    return document
      .querySelector(this.templateSelector)
      .content.cloneNode(true);
  }

  _handleLikeClick(event) {
    if (event.target.src.includes(likeIcon)) {
      event.target.src = likedIcon;
    } else {
      event.target.src = likedIcon;
    }
  }

  _handleDeleteClick(event) {
    event.target.parentElement.remove();
  }

  _handlePhotoClick() {
    this.openPopup(this.name, this.link);
  }

  createNewCard() {
    const newCard = this._cloneTemplate();
    const img = newCard.querySelector(".photo-grid__photo");
    img.src = this.link;
    img.alt = this.name;

    newCard.querySelector(".photo-grid__name").textContent = this.name;

    newCard
      .querySelector(".photo-grid__like")
      .addEventListener("click", this._handleLikeClick);

    newCard
      .querySelector(".photo-grid__delete")
      .addEventListener("click", this._handleDeleteClick);

    newCard
      .querySelector(".photo-grid__photo")
      .addEventListener("click", (event) => this._handlePhotoClick(event));

    photoGrid.prepend(newCard);
  }
}

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((card) =>
      new Card(card.name, card.link, openPopup).createNewCard()
    );
  })
  .catch((err) => {
    console.error(err);
    alert(err);
  });
