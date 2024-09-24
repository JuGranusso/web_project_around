import { PopupWithImage } from "./PopupWithImage.js";
import { api } from "./Api.js";
import likeIcon from "../assets/like.svg";
import likedIcon from "../assets/liked.svg";
import { PopupWithForm } from "./PopupWithForm.js";

const photoGrid = document.querySelector(".photo-grid");

const imgPopup = new PopupWithImage("img-popup");
imgPopup.setEventListeners();

const openImagePopup = (name, link) => {
  imgPopup.open(name, link);
};

export class Card {
  constructor(
    { name, link, likeCount, isLiked },
    openImagePopup,
    openDeletePopup,
    onLikeClick,
    templateSelector = "#grid-card_template"
  ) {
    this.name = name;
    this.link = link;
    this.likeCount = likeCount;
    this.isLiked = isLiked;
    this.templateSelector = templateSelector;
    this.openImagePopup = openImagePopup;
    this.openDeletePopup = openDeletePopup;
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

    this.onLikeClick(isLiking)
      .then(({ likeCount, isLiked }) => {
        this.likeCount = likeCount;
        this.isLiked = isLiked;
        this._setIsLiked(cardElm);
        this._setLikeCount(cardElm);
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  }

  _handleDeleteClick() {
    this.openDeletePopup();
  }

  _handlePhotoClick() {
    this.openImagePopup(this.name, this.link);
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

    if (this.openDeletePopup) {
      const deleteButton = newCard.querySelector(".photo-grid__delete");

      deleteButton.addEventListener("click", (event) =>
        this._handleDeleteClick(event)
      );
      deleteButton.classList.add("photo-grid__delete_show");
    }

    newCard
      .querySelector(".photo-grid__photo")
      .addEventListener("click", (event) => this._handlePhotoClick(event));

    this._setLikeCount(newCard);
    this._setIsLiked(newCard);

    photoGrid.prepend(newCard);
  }
}

export const reloadCards = () => {
  return api
    .getCards()
    .then((cards) => {
      cards.forEach((card) => {
        const handleLikeClick = (isLiking) => {
          if (isLiking) {
            return api.likeCard(card._id);
          } else {
            return api.unlikeCard(card._id);
          }
        };

        let openDeletePopup;

        if (card.owner._id === api.userId) {
          const handleDeleteClick = () => {
            return api.deleteCard(card._id).then(() => reloadCards());
          };

          const deletePopup = new PopupWithForm(
            "delete-form",
            handleDeleteClick
          );
          deletePopup.setEventListeners();

          openDeletePopup = () => deletePopup.open();
        }

        new Card(
          card,
          openImagePopup,
          openDeletePopup,
          handleLikeClick
        ).createNewCard();
      });
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

reloadCards();
