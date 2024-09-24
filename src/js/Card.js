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
  constructor(
    { name, link, likeCount, isLiked },
    openPopup,
    onLikeClick,
    templateSelector = "#grid-card_template"
  ) {
    this.name = name;
    this.link = link;
    this.likeCount = likeCount;
    this.isLiked = isLiked;
    this.templateSelector = templateSelector;
    this.openPopup = openPopup;
    this.onLikeClick = onLikeClick;
  }

  _cloneTemplate() {
    return document
      .querySelector(this.templateSelector)
      .content.cloneNode(true);
  }

  _setLikeCount(cardElm) {
    const likeCount = cardElm.querySelector(".photo-grid__like-count");
    const showClass = "photo-grid__like-count_show";

    if (this.likeCount > 0) {
      likeCount.textContent = this.likeCount;
      likeCount.classList.add(showClass);
    } else {
      likeCount.textContent = "";
      likeCount.classList.remove(showClass);
    }
  }

  _setIsLiked(cardElm) {
    const likeButton = cardElm.querySelector(".photo-grid__like");

    likeButton.src = this.isLiked ? likedIcon : likeIcon;
  }

  _handleLikeClick(event) {
    const likeButton = event.target;
    const isLiking = likeButton.src.includes(likeIcon);
    const cardElm = likeButton.closest(".photo-grid__card");

    this.onLikeClick(isLiking).then(({ likeCount, isLiked }) => {
      this.likeCount = likeCount;
      this.isLiked = isLiked;
      this._setIsLiked(cardElm);
      this._setLikeCount(cardElm);
    });
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
      .addEventListener("click", (event) => this._handleLikeClick(event));

    newCard
      .querySelector(".photo-grid__delete")
      .addEventListener("click", this._handleDeleteClick);

    newCard
      .querySelector(".photo-grid__photo")
      .addEventListener("click", (event) => this._handlePhotoClick(event));

    this._setLikeCount(newCard);
    this._setIsLiked(newCard);

    photoGrid.prepend(newCard);
  }
}

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((card) => {
      const handleLikeClick = (isLiking) => {
        if (isLiking) {
          return api.likeCard(card._id);
        } else {
          return api.unlikeCard(card._id);
        }
      };

      new Card(card, openPopup, handleLikeClick).createNewCard();
    });
  })
  .catch((err) => {
    console.error(err);
    alert(err);
  });
