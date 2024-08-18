import { PopupWithImage } from "./PopupWithImage.js";
import likeIcon from "../assets/like.svg";
import likedIcon from "../assets/liked.svg";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

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

initialCards.forEach((initialCard) =>
  new Card(initialCard.name, initialCard.link, openPopup).createNewCard()
);
